from app.database import collection
from app.utils.serializer import serialize_calculation


def get_history():
    return [serialize_calculation(doc) for doc in collection.find()]


def delete_history():
    result = collection.delete_many({})

    return result.deleted_count
