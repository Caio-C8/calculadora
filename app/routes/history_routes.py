from fastapi import APIRouter

from app.controllers.calculation_controller import (
    get_history,
    insert_calculation,
    delete_history,
)
from app.utils.response import build_response
from app.models.calculation_model import CalculationIn

history_router = APIRouter()


@history_router.get("/")
def get():
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


@history_router.post("/")
def post(calc: CalculationIn):
    try:
        data = insert_calculation(calc)

        return build_response("Cálculo adicionado", True, 201, data.model_dump())
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )


@history_router.delete("/")
def delete():
    try:
        count = delete_history()

        return build_response("Histórico apagado", True, 200, {"deleted_count": count})
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )
