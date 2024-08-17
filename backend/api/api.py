from http import HTTPStatus

from api.views import uom_router, user_auth_router, user_no_auth_router, category_router
from django.core.exceptions import (
    FieldError,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError,
)
from ninja.errors import ValidationError as NinjaValidationError
from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth

api = NinjaExtraAPI(title='Shopping List API', 
                    description='Endpoints for interacting with the shopping list application', 
                    urls_namespace="api")
api.add_router("/uom", uom_router, auth=JWTAuth(), tags=["Units of Measure"])
api.add_router("/category", category_router, auth=JWTAuth(), tags=["Categories"])
api.add_router("/users", user_no_auth_router, tags=["Users"])
api.add_router("/users", user_auth_router, auth=JWTAuth(), tags=["Users"])



@api.exception_handler(ObjectDoesNotExist)
def handle_object_does_not_exist(request, exc):
    return api.create_response(
        request,
        {"message": "ObjectDoesNotExist", "detail": str(exc)},
        status=HTTPStatus.NOT_FOUND,
    )


@api.exception_handler(PermissionDenied)
def handle_permission_error(request, exc: PermissionDenied):
    return api.create_response(
        request,
        {
            "message": "PermissionDenied",
            "detail": "You don't have the permission to access this resource.",
        },
        status=HTTPStatus.FORBIDDEN,
    )


@api.exception_handler(NinjaValidationError)
def handle_ninja_validation_error(request, exc: NinjaValidationError):
    mapped_msg = {error["loc"][-1]: error["msg"] for error in exc.errors}
    return api.create_response(
        request,
        data={"message": "NinjaValidationError", "detail": mapped_msg},
        status=HTTPStatus.BAD_REQUEST,
    )


@api.exception_handler(ValidationError)
def handle_validation_error(request, exc: ValidationError):
    status = HTTPStatus.BAD_REQUEST
    for field, errors in exc.error_dict.items():
        for error in errors:
            if error.code in ["unique", "unique_together"]:
                status = HTTPStatus.CONFLICT
    return api.create_response(
        request,
        data={"message": "ValidationError", "detail": exc.message_dict},
        status=status,
    )


@api.exception_handler(FieldError)
def handle_field_error(request, exc: FieldError):
    return api.create_response(
        request,
        data={"message": "FieldError", "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )
