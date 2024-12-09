import React, { useState } from 'react';
import axios from 'axios';
import './disease-prediction.css'; // Import the CSS for styling

const DiseasePredictionPage = () => {
  const symptoms = [
    'itching', 'continuous_sneezing', 'shivering', 'joint_pain',
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
    'inflammatory_nails', 'yellow_crust_ooze'
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSymptoms(prev => 
      checked ? [...prev, value] : prev.filter(symptom => symptom !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction('');
    setError('');
    setLoading(true);

    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        symptoms: selectedSymptoms,
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Error predicting disease. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="disease-prediction-container">
      <h1 className="heading">Disease Prediction</h1>
      <form onSubmit={handleSubmit}>
        <h2 className="subheading">Select Symptoms</h2>
        <div className="symptoms-selection">
          {symptoms.map(symptom => (
            <div key={symptom} className="checkbox-container">
              <input
                type="checkbox"
                id={symptom}
                value={symptom}
                onChange={handleChange}
              />
              <label htmlFor={symptom} style={{ marginLeft: '8px' }}>{symptom}</label>
            </div>
          ))}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>
      </form>

      {/* Display prediction result or error message */}
      <div className="prediction-output">
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
        {prediction && (
          <div className="prediction-result">
            <h2>Prediction Result</h2>
            <p>The probable disease is: <strong>{prediction}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseasePredictionPage;
