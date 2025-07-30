from app.models.calculation_model import CalculationOut


def serialize_calculation(doc) -> CalculationOut:
    return CalculationOut(
        id=str(doc["_id"]),
        expression=doc["expression"],
        result=doc["result"],
        created_at=doc["created_at"],
    )
