from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.history_routes import history_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix="/history")


@app.get("/")
def root():
    return {"message": "API is running"}
