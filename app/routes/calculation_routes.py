from fastapi import APIRouter
from bson import ObjectId

from app.controllers.calculation_controller import (
    insert_calculation,
    delete_calculation,
)
from app.utils.response import build_response, ResponseModel
from app.models.calculation_model import CalculationIn

calculation_router = APIRouter()


@calculation_router.post("/", response_model=ResponseModel)
def handle_insert_calculation(calc: CalculationIn):
    try:
        data = insert_calculation(calc)

        return build_response("Cálculo adicionado", True, 201, data.model_dump())
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )


@calculation_router.delete("/{calc_id}", response_model=ResponseModel)
def handle_delete_calculation(calc_id: str):
    try:
        if not ObjectId.is_valid(calc_id):
            return build_response("ID inválido", False, 406)

        data = delete_calculation(calc_id)

        if not data:
            return build_response("Cálculo não encontrado", True, 204)

        return build_response(
            "Cálculo apagado", True, 200, {"deleted_calculation": data.model_dump()}
        )
    except Exception as error:
        return build_response(
            "Erro interno no servidor", False, 500, {"error": str(error)}
        )
