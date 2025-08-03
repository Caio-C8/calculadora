from datetime import datetime, timezone
from bson import ObjectId

from app.database import collection
from app.models.calculation_model import CalculationIn
from app.utils.serializer import serialize_calculation


def insert_calculation(calc: CalculationIn):
    data = calc.model_dump()
    data["created_at"] = datetime.now(timezone.utc)
    result = collection.insert_one(data)

    return serialize_calculation(collection.find_one({"_id": result.inserted_id}))


def delete_calculation(id: str):
    result = collection.find_one_and_delete({"_id": ObjectId(id)})

    return serialize_calculation(result) if result else None
