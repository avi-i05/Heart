from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import pickle
import traceback
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp-client.onrender.com"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
EXPECTED_FEATURES_LENGTH = 13

@app.get("/")
async def home():
    return {"message": "Welcome to the Heart Prediction API! Use /predict for predictions."}

@app.on_event("startup")
async def load_model():
    global model
    try:
        with open("model.pkl", "rb") as f:
            model = pickle.load(f)
            print("✅ Model loaded successfully.")
    except Exception as e:
        print("❌ Error loading model:", e)
        traceback.print_exc()

class PredictionRequest(BaseModel):
    features: List[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    try:
        print("\n🔍 Incoming Request:", request.features)

        if len(request.features) != EXPECTED_FEATURES_LENGTH:
            msg = f"❌ Invalid input length. Expected {EXPECTED_FEATURES_LENGTH}, but got {len(request.features)}."
            print(msg)
            return {
                "error": msg,
                "hint": f"Send a list of {EXPECTED_FEATURES_LENGTH} float values under the 'features' key."
            }

        prediction = model.predict([request.features])
        print(f"✅ Prediction successful: {prediction}")

        return {"prediction": int(prediction[0])}

    except Exception as e:
        print("❌ Exception during prediction:")
        traceback.print_exc()
        return {
            "error": "An error occurred during prediction.",
            "details": str(e)
        }
