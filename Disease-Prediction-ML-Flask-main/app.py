from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle
import os

# Load the pre-trained model
try:
    model = pickle.load(open('model.pkl', 'rb'))
    print("Model loaded successfully!")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins="http://localhost:3000")  # Allow cross-origin requests from React frontend

@app.route("/")
def home():
    return "Disease Prediction API is running!"

@app.route("/predict", methods=['POST'])
def predict():
    col = ['itching', 'continuous_sneezing', 'shivering', 'joint_pain',
           'stomach_pain', 'vomiting', 'fatigue', 'weight_loss', 'restlessness',
           'lethargy', 'high_fever', 'headache', 'dark_urine', 'nausea',
           'pain_behind_the_eyes', 'constipation', 'abdominal_pain', 'diarrhoea',
           'mild_fever', 'yellowing_of_eyes', 'malaise', 'phlegm', 'congestion',
           'chest_pain', 'fast_heart_rate', 'neck_pain', 'dizziness',
           'puffy_face_and_eyes', 'knee_pain', 'muscle_weakness',
           'passage_of_gases', 'irritability', 'muscle_pain', 'belly_pain',
           'abnormal_menstruation', 'increased_appetite', 'lack_of_concentration',
           'visual_disturbances', 'receiving_blood_transfusion', 'coma',
           'history_of_alcohol_consumption', 'blood_in_sputum', 'palpitations',
           'inflammatory_nails', 'yellow_crust_ooze']

    try:
        # Get JSON data from React
        data = request.json
        print(f"Received data: {data}")  # Log incoming data to check it
        inputt = data.get('symptoms', [])

        if not inputt:
            return jsonify({'error': 'No symptoms provided'}), 400

        # Create feature vector for model prediction
        b = [1 if symptom in inputt else 0 for symptom in col]
        b = np.array(b).reshape(1, -1)

        if model is None:
            return jsonify({'error': 'Model not loaded correctly'}), 500

        prediction = model.predict(b)[0]

        print(f"Prediction: {prediction}")  # Log the prediction result
        return jsonify({'prediction': prediction})

    except Exception as e:
        print(f"Error during prediction: {str(e)}")  # Log the error message
        return jsonify({'error': f"Prediction failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
