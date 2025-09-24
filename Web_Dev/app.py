from dotenv import load_dotenv
load_dotenv()
from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
import numpy as np
import requests
import datetime
from sklearn.preprocessing import LabelEncoder, StandardScaler
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage
import os

app = Flask(__name__)

# Load all models and preprocessors
try:
    # Safety model
    safety_model = joblib.load("safety_model.pkl")
    safety_scaler = joblib.load("safety_scaler.pkl")
    safety_encoders = joblib.load("safety_encoders.pkl")
    safety_label_encoder = joblib.load("safety_label_encoder.pkl")
    
    # Price model
    price_model = joblib.load("price_model.pkl")
    price_scaler = joblib.load("price_scaler.pkl")
    price_encoders = joblib.load("price_encoders.pkl")
    
    # Popularity model
    popularity_model = joblib.load("popularity_model.pkl")
    popularity_scaler = joblib.load("popularity_scaler.pkl")
    popularity_encoders = joblib.load("popularity_encoders.pkl")
    
    print("All models loaded successfully!")
except Exception as e:
    print(f"Error loading models: {e}")

# OpenWeather API configuration
API_KEY = "1f83e6304f292db0a23225da51a6f712"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

def get_weather_data(city_name):
    """Fetch weather data from OpenWeather API"""
    try:
        complete_url = f"{BASE_URL}q={city_name}&appid={API_KEY}&units=metric"
        response = requests.get(complete_url)
        
        if response.status_code == 200:
            data = response.json()
            condition = data['weather'][0]['main']
            temperature = data['main']['temp']
            wind_speed = data['wind']['speed'] * 3.6  # convert m/s to km/h
            
            return {
                'condition': condition,
                'temperature': temperature,
                'wind_speed': wind_speed,
                'status': 'success'
            }
        else:
            return {'status': 'error', 'message': 'City not found'}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}

def predict_safety(destination, temperature, condition, wind_speed):
    """Predict safety using the safety model"""
    try:
        input_data = {
            "Destination": destination,
            "Temperature_C": temperature,
            "Condition": condition,
            "Wind_Speed_kmph": wind_speed
        }
        
        input_df = pd.DataFrame([input_data])
        
        # Handle categorical encoding with unseen labels
        categorical_cols = ["Destination", "Condition"]
        numeric_cols = ["Temperature_C", "Wind_Speed_kmph"]
        
        for column in categorical_cols:
            encoder = safety_encoders[column]
            # Handle unseen labels by adding them to encoder classes
            unseen = set(input_df[column]) - set(encoder.classes_)
            if unseen:
                encoder.classes_ = np.concatenate([encoder.classes_, list(unseen)])
            input_df[column] = encoder.transform(input_df[column])
        
        # Keep numeric columns as-is
        input_df[numeric_cols] = input_df[numeric_cols]
        
        # Scale the input
        input_scaled = safety_scaler.transform(input_df)
        
        # Make prediction
        prediction = safety_model.predict(input_scaled)
        safety_result = safety_label_encoder.inverse_transform(prediction)[0]
        
        return safety_result
    except Exception as e:
        return f"Error: {str(e)}"

def predict_price(destination, condition, hotel_rating):
    """Predict price using the price model"""
    try:
        input_data = {
            "Destination": destination,
            "Condition": condition,
            "Hotel_Rating": hotel_rating
        }
        
        input_df = pd.DataFrame([input_data])
        
        # Handle categorical encoding
        categorical_cols = ["Destination", "Condition"]
        numeric_cols = ["Hotel_Rating"]
        
        for column in categorical_cols:
            encoder = price_encoders[column]
            # Handle unseen labels
            unseen = set(input_df[column]) - set(encoder.classes_)
            if unseen:
                encoder.classes_ = np.concatenate([encoder.classes_, list(unseen)])
            input_df[column] = encoder.transform(input_df[column])
        
        input_df[numeric_cols] = input_df[numeric_cols]
        
        # Scale the input
        input_scaled = price_scaler.transform(input_df)
        
        # Make prediction
        prediction = price_model.predict(input_scaled)
        
        return int(prediction[0])
    except Exception as e:
        return f"Error: {str(e)}"

def predict_popularity(destination, condition, temperature, festival, holiday_season):
    """Predict popularity using the popularity model"""
    try:
        current_month = datetime.date.today().strftime("%B")
        
        input_data = {
            "Destination": destination,
            "Condition": condition,
            "Month": current_month,
            "Temperature": temperature,
            "Festival": festival,
            "Holiday Season": holiday_season
        }
        
        input_df = pd.DataFrame([input_data])
        
        # Handle categorical encoding
        categorical_cols = ["Destination", "Condition", "Month", "Festival", "Holiday Season"]
        numeric_cols = ["Temperature"]
        
        for column in categorical_cols:
            encoder = popularity_encoders[column]
            # Handle unseen labels
            unseen = set(input_df[column]) - set(encoder.classes_)
            if unseen:
                encoder.classes_ = np.concatenate([encoder.classes_, list(unseen)])
            input_df[column] = encoder.transform(input_df[column])
        
        input_df[numeric_cols] = input_df[numeric_cols]
        
        # Scale the input
        input_scaled = popularity_scaler.transform(input_df)
        
        # Make prediction
        prediction = popularity_model.predict(input_scaled)
        
        return int(prediction[0])
    except Exception as e:
        return f"Error: {str(e)}"
    
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        # Initialize your Groq model (same as in your notebook)
        model = init_chat_model("groq:llama-3.1-8b-instant")
        
        messages = [
            SystemMessage("You are a helpful AI assistant who is specialized for trip related issues. You are supposed to answer the user in very short"),     
            HumanMessage(user_message)
        ]
        
        response = model.invoke(messages)
        
        return jsonify({
            'status': 'success',
            'response': response.content
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        data = request.json
        destination = data.get('destination')
        festival = data.get('festival')
        holiday = data.get('holiday')
        hotel_rating = int(data.get('hotel_rating'))
        
        # Get weather data
        weather_data = get_weather_data(destination)
        
        if weather_data['status'] == 'error':
            return jsonify({
                'status': 'error',
                'message': weather_data['message']
            })
        
        condition = weather_data['condition']
        temperature = weather_data['temperature']
        wind_speed = weather_data['wind_speed']
        
        # Make predictions
        safety_prediction = predict_safety(destination, temperature, condition, wind_speed)
        price_prediction = predict_price(destination, condition, hotel_rating)
        popularity_prediction = predict_popularity(destination, condition, temperature, festival, holiday)
        
        # Return results
        return jsonify({
            'status': 'success',
            'weather': {
                'condition': condition,
                'temperature': temperature,
                'wind_speed': wind_speed
            },
            'predictions': {
                'safety': safety_prediction,
                'price': price_prediction,
                'popularity': popularity_prediction
            }
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        })

@app.route('/get_weather/<city>')
def get_weather(city):
    """Endpoint to get weather data for a specific city"""
    weather_data = get_weather_data(city)
    return jsonify(weather_data)

if __name__ == '__main__':
    app.run(debug=True)
