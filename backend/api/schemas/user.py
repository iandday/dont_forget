from uuid import UUID
from ninja import Schema, ModelSchema
from django.contrib.auth import get_user_model
from typing import Optional
from datetime import datetime, date
from ninja_jwt.schema import TokenObtainPairInputSchema

class UserIn(Schema):
    email: str
    password: str
    first_name: Optional[str]
    last_name: Optional[str]

class UserUpdate(Schema):
    email: str = None
    password: str  = None
    first_name: str  = None
    last_name: str  = None


class UserOut(Schema):
    id: UUID
    email: str
    first_name: Optional[str]
    last_name: Optional[str]

class UserSchema(ModelSchema):
    class Meta:
        model = get_user_model()
        fields = ["id", "email", "first_name", "last_name"]

class UserTokenOutSchema(Schema):
    token: str
    user: UserSchema
    token_exp_date: Optional[datetime]

class RegEnabledSchema(Schema):
    enabled: bool

class TokenObtainPairOut(Schema):
    access: str
    refresh: str
    user: UserSchema

class TokenObtainPair(TokenObtainPairInputSchema):
    def output_schema(self):
        out_dict = self.get_response_schema_init_kwargs()
        out_dict.update(user=UserSchema.from_orm(self._user))
        return TokenObtainPairOut(**out_dict)

class TokenRefreshPairOut(Schema):
    access: str
    refresh: str