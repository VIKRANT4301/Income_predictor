from flask import Flask, request, jsonify
import pickle
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from tabulate import tabulate


app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and bcrypt
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Enable CORS to allow React app to communicate with the Flask API
CORS(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Create the database
with app.app_context():
    db.create_all()


# Sign-up route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Check if the user already exists
    existing_user = User.query.filter((User.username == data['username']) | (User.email == data['email'])).first()
    if existing_user:
        return jsonify({"message": "Username or Email already exists"}), 400

    # Hash the password before saving it
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Create new user and save to the database
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201



@app.route('/view-users', methods=['GET'])
def view_users():
    # Fetch all users
    users = User.query.all()

    # Check if users exist
    if not users:
        return jsonify({"message": "No users found!"}), 404

    # Prepare data for table
    table_data = []
    for user in users:
        table_data.append([user.id, user.username, user.email, user.password])

    # Define table headers
    headers = [ "ID","Username", "Email", "Password"]

    # Convert data to table format
    table_str = tabulate(table_data, headers=headers, tablefmt="pretty")

    # Return the data as JSON
    return jsonify({"data": table_str})



# Sign-in route
@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()

    # Check if the user exists
    user = User.query.filter_by(username=data['username']).first()
    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check if the password is correct
    if not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Incorrect password"}), 400

    return jsonify({"message": "User signed in successfully"}), 200






# Load the pre-trained model
model = pickle.load(open('model.pkl', 'rb'))

# Dictionaries for categorical variables
Age_dict={18: 0, 19: 1, 20: 2, 21: 3, 22: 4, 23: 5, 24: 6, 25: 7, 26: 8, 27: 9, 28: 10,
 29: 11, 30: 12, 31: 13, 32: 14, 33: 15, 34: 16, 35: 17, 36: 18, 37: 19, 38: 20,
 39: 21, 40: 22, 41: 23, 42: 24, 43: 25, 44: 26, 45: 27, 46: 28, 47: 29, 48: 30,
 49: 31, 50: 32, 51: 33, 52: 34, 53: 35, 54: 36, 55: 37, 56: 38, 57: 39, 58: 40,
 59: 41, 60: 42, 61: 43, 62: 44, 63: 45, 64: 46, 65: 47, 66: 48, 67: 49, 68: 50,
 69: 51, 70: 52}
Education_Level_dict = {"Doctorate":0, "Bachelor's":1, "Master's":2, 'High School':3}
Number_of_Dependents_dict={5: 0, 0: 1, 1: 2,2:3, 3:4,4:5} 
Occupation_dict = {'Technology': 0, 'Finance': 1, 'Others': 2, 'Education': 3, 'Healthcare': 4}
Location_dict = {'Urban': 0, 'Rural': 1, 'Suburban': 2}
Work_Experience_dict = {  0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
    10: 10, 11: 11, 12: 12, 13: 13, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18,
    19: 19, 20: 20, 21: 21, 22: 22, 23: 23, 24: 24, 25: 25, 26: 26, 27: 27,
    28: 28, 29: 29, 30: 30, 31: 31, 32: 32, 33: 33, 34: 34, 35: 35, 36: 36,
    37: 37, 38: 38, 39: 39, 40: 40, 41: 41, 42: 42, 43: 43, 44: 44, 45: 45,
    46: 46, 47: 47, 48: 48, 49: 49, 50: 50}
Marital_Status_dict = {'Married': 0, 'Single': 1, 'Divorced': 2}
Employment_Status_dict ={'Full-time': 0, 'Self-employed': 1, 'Part-time': 2}
Household_Size_dict = {1: 0, 2: 1, 3: 2,4:3,5:4,6:5,7:6}
Homeownership_Status_dict={'Own': 0, 'Rent': 1}
Type_of_Housing_dict ={'Apartment': 0, 'Single-family home': 1, 'Townhouse': 2}
Gender_dict={'Male': 0, 'Female': 1}
Primary_Mode_of_Transportation_dict={'Public transit': 0, 'Biking': 1, 'Car': 2 , 'Walking': 3}



@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        Age = Age_dict[data['Age']]
        Education_Level= Education_Level_dict[data['Education_Level']]
        Number_of_Dependents = Number_of_Dependents_dict[data['Number_of_Dependents']]
        Occupation = Occupation_dict [data['Occupation']]
        Location = Location_dict[data['Location']]
        Work_Experience= Work_Experience_dict[data['Work_Experience']]
        Marital_Status= Marital_Status_dict [data['Marital_Status']]
        Employment_Status= Employment_Status_dict[data['Employment_Status']]
        Household_Size= Household_Size_dict[data['Household_Size']]
        Homeownership_Status= Homeownership_Status_dict [data['Homeownership_Status']]
        Type_of_Housing= Type_of_Housing_dict [data['Type_of_Housing']]
        Gender= Gender_dict [data['Gender']]
        Primary_Mode_of_Transportation = Primary_Mode_of_Transportation_dict [data['Primary_Mode_of_Transportation']]


        features = [Age, Education_Level, Number_of_Dependents , Occupation ,Location ,  Work_Experience,  Marital_Status,  Employment_Status,Household_Size,Homeownership_Status,Type_of_Housing, Gender,Primary_Mode_of_Transportation]
        prediction = model.predict([features])[0]

        return jsonify({'prediction': round(prediction, 2)})
    except KeyError as e:
        return jsonify({'error': f'Missing data for: {e}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
