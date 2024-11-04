from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = "APPLE"

@app.get("/answer")
async def get_answer():
  return answer

app.mount("/", StaticFiles(directory="static", html=True), name="static")