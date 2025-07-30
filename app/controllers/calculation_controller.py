from datetime import datetime, timezone

from app.database import collection
from app.models.calculation_model import CalculationIn
from app.utils.serializer import serialize_calculation


def insert_calculation(calc: CalculationIn):
    data = calc.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    result = collection.insert_one(data)
    return serialize_calculation(collection.find_one({"_id": result.inserted_id}))


def get_history():
    return [serialize_calculation(doc) for doc in collection.find()]


def delete_history():
    result = collection.delete_many({})
    return result.deleted_count
