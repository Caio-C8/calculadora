from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.routes.history_routes import history_router
from app.routes.calculation_routes import calculation_router

app = FastAPI()


origins_env = os.environ.get("ALLOWED_ORIGINS", "")
origins = [url.strip() for url in origins_env.split(",") if url.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix="/history")
app.include_router(calculation_router, prefix="/calculation")


@app.get("/")
def root():
    return {"message": "API is running"}
