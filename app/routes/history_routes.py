from fastapi import APIRouter

from app.controllers.history_controller import (
    get_history,
    delete_history,
)
from app.utils.response import build_response, ResponseModel


history_router = APIRouter()


@history_router.get("/", response_model=ResponseModel)
def handle_get_history():
    try:
        data = get_history()

        if not data:
            return build_response("Histórico vazio", True, 204)

        return build_response(
            "Histórico recuperado", True, 200, [d.model_dump() for d in data]
        )
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )


@history_router.delete("/", response_model=ResponseModel)
def handle_delete_history():
    try:
        count = delete_history()

        return build_response("Histórico apagado", True, 200, {"deleted_count": count})
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )
