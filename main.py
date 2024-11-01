from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = 'TRAIN'

@app.get('/answer')
async def get_answer():
  return {'answer': answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")