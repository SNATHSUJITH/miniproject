from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = genai.GenerativeModel("gemini-pro")
GOOGLE_API_KEY = "AIzaSyCYnTLZcsiRAWlvuua4DOEMaQHWMNJKICY"
genai.configure(api_key=GOOGLE_API_KEY)
chat = model.start_chat(history=[])

origins = [
    "http://localhost:3000",  # React dev server
    "http://localhost:5173",
    "https://miniproject-one.vercel.app",  # Vercel domain
    "http://localhost:8000/api/getGeminiResponse",
]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestModel(BaseModel):
    data: str

class ResponseModel(BaseModel):
    result: str

def get_gemini_response(question: str) -> str:
    try:
        response = chat.send_message(question)
        return response.text  # Ensure that the response text is returned
    except Exception as e:
        print(f"Error getting Gemini response: {e}")
        raise HTTPException(status_code=500, detail="Error getting Gemini response")

@app.post("/api/getGeminiResponse", response_model=ResponseModel)
async def api_get_gemini_response(request: RequestModel):
    try:
        result = get_gemini_response(request.data)
        return ResponseModel(result=result)
    except Exception as e:
        print(f"Error in /api/getGeminiResponse: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
