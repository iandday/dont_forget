import logging
import environ
from typing import List
from api.models.user import User
from api.schemas.user import RegEnabledSchema, TokenObtainPair, TokenObtainPairOut, TokenRefreshPairOut, UserIn, UserOut, UserUpdate
from ninja_jwt.schema import TokenObtainPairInputSchema, TokenRefreshInputSchema
from django.contrib.auth import get_user_model
from ninja import Router
from ninja_crud import viewsets
from ninja_crud.views import (
    CreateView,
    ListView,
    ReadView,
    UpdateView,
    DeleteView
)
from ninja_extra.exceptions import APIException
from ninja_extra import status

logger = logging.getLogger(__name__)

env = environ.Env(ENABLE_REGISTRATION=(bool, False))

# unauthenticated routes
no_auth_router = Router()

@no_auth_router.post("/", summary='Create user', response=UserOut)
def register_user(request, user_in: UserIn):
    if env.bool("ENABLE_REGISTRATION"):
        user = get_user_model().objects.create_user(
        email=user_in.email, password=user_in.password
        )
        return user
    else:
        raise APIException("Registration is disabled", code=status.HTTP_400_BAD_REQUEST)

@no_auth_router.post(
    "/login", response=TokenObtainPairOut, url_name="token_obtain_pair"
)
def new_token(request, user_token: TokenObtainPair):
    user_token.check_user_authentication_rule()
    return user_token.output_schema()

@no_auth_router.get("/reg_enabled", response=RegEnabledSchema, url_name="reg_enabled")
def reg_enabled(request):
    if env.bool("ENABLE_REGISTRATION"):
        return {"enabled": True}
    else:
        return {"enabled": False}

# authenticated routes
auth_router = Router()

@auth_router.get("/me", summary='Get current user', response=UserOut)
def get_current_user(request):
    """
    Get the current authenticated user.
    """
    try:
        user = get_user_model().objects.get(id=request.user.id)
        return user
    except:
        raise APIException("Invalid user ID", code=status.HTTP_400_BAD_REQUEST)
    
@auth_router.patch("/me", summary='Update current user', response=UserOut, url_name="me")
def update_me(request, payload: UserUpdate):
    try:
        user = get_user_model().objects.get(id=request.user.id)
        for attr, value in payload.dict(exclude_unset=True).items():
            if attr == 'password':
                user.set_password(value)
            else:
                setattr(user, attr, value)
        user.save()
        return user
    except:
        raise APIException("Invalid user ID", code=status.HTTP_400_BAD_REQUEST)
    
# not using class view because extra endpoints are added
ListView(name='List users', response_body=List[UserOut], model=User).add_view_to(auth_router)
ReadView(name= 'Get user details', response_body=UserOut, path='/{id}', model=User).add_view_to(auth_router)
# not using this because of password update logic
#UpdateView(name='Update User', request_body=UserUpdate, response_body=UserOut, path='/{id}', model=User).add_view_to(auth_router)
DeleteView(name='Delete user', path='/{id}', model=User).add_view_to(auth_router)

# add JWT endpoints
@auth_router.post(
    "/refresh",
    response=TokenRefreshPairOut,
    url_name="token_refresh",
    auth=None,
)
def refresh_token(request, refresh_token: TokenRefreshInputSchema):
    return refresh_token.to_response_schema()



