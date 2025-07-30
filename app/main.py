from fastapi import FastAPI

from app.routes.history_routes import history_router

app = FastAPI()
app.include_router(history_router, prefix="/history")


@app.get("/")
def root():
    return {"message": "API is running"}
