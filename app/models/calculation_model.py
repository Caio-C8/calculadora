from pydantic import BaseModel
from datetime import datetime


class CalculationIn(BaseModel):
    expression: str
    result: float


class Calculation(CalculationIn):
    created_at: datetime


class CalculationOut(Calculation):
    id: str
