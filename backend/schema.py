from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Charity, Country, NewsEvent

ma = Marshmallow()


class CharitySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Charity


class CountrySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Country


class NewsEventSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = NewsEvent


charity_schema = CharitySchema()
country_schema = CountrySchema()
newsevent_schema = NewsEventSchema()
