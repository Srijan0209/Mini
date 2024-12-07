import { useState, useEffect } from 'react';
import './disease-prediction.css';

export default function DiseasePrediction() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Symptoms list should match what is used in the backend
  const symptomsList = ['Fever', 'Cough', 'Fatigue', 'Headache', 'Body Pain']; // Example symptoms

  // Handle checkbox changes for symptom selection
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter((symptom) => symptom !== value));
    }
  };

  // Clear previous prediction when symptoms change
  useEffect(() => {
    setPredictionResult(null);
  }, [selectedSymptoms]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSymptoms.length === 0) {
      setPredictionResult('Please select at least one symptom.');
      return;
    }

    setLoading(true);

    try {
      // Send a POST request to the Flask API with selected symptoms
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms: selectedSymptoms }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setPredictionResult(`Predicted Disease: ${data.disease}`); // Display predicted disease
      } else {
        setLoading(false);
        setPredictionResult('Error: Could not fetch prediction');
      }
    } catch (error) {
      setLoading(false);
      setPredictionResult('Error: Something went wrong');
    }
  };

  return (
    <div className="disease-prediction-container">
      <h1 className="heading">Disease Prediction</h1>
      <p className="subheading">Select symptoms to predict the disease</p>

      <form onSubmit={handleSubmit}>
        <div className="symptoms-selection">
          {symptomsList.map((symptom, index) => (
            <div key={index} className="checkbox-container">
              <input
                type="checkbox"
                id={symptom}
                value={symptom}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={symptom}>{symptom}</label>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading || selectedSymptoms.length === 0}>
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>
      </form>

      {predictionResult && (
        <div className="prediction-result">
          <h4>Prediction Result</h4>
          <p>{predictionResult}</p>
        </div>
      )}
    </div>
  );
}