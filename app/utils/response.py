from pydantic import BaseModel


class ResponseModel(BaseModel):
    message: str
    success: bool
    status: int
    data: dict | list | None

    class Config:
        json_encoders = {dict: lambda v: v, list: lambda v: v}
        orm_mode = True
        exclude_none = True


def build_response(
    message: str, success: bool, status: int, data: dict | list | None = None
):
    return ResponseModel(message=message, success=success, status=status, data=data)
