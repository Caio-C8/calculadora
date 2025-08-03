from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.history_routes import history_router
from app.routes.calculation_routes import calculation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(history_router, prefix="/history")
app.include_router(calculation_router, prefix="/calculation")


@app.get("/")
def root():
    return {"message": "API is running"}
