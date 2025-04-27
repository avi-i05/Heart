from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import pickle

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()




app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



with open("model.pkl", "rb") as f:
    model = pickle.load(f)

class PredictionRequest(BaseModel):
    features: List[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    print("Incoming features:", request.features)
    print("Length of features:", len(request.features))

    try:
        prediction = model.predict([request.features])
        print(" Prediction result:", prediction)
        return {"prediction": int(prediction[0])}
    except Exception as e:
        print("Error during prediction:", e)
        return {"error": str(e)}
