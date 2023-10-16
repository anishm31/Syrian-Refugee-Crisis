from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql://admin:bWETUBol22kcXqpAfr9R@database-syrian-refugee-crisis.ct6yjt2fdsku.us-east-2.rds.amazonaws.com:3306/database-syrian-refugee-crisis?charset=utf8"
db = SQLAlchemy(app)


class Charity(db.Model):
    __tablename__ = "charities"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    org_type = db.Column(db.ARRAY(db.String))
    logo_img = db.Column(db.String)
    org_img = db.Column(db.String)
    established = db.Column(db.String)
    short_name = db.Column(db.String)
    long_name = db.Column(db.String)
    parent_org = db.Column(db.String)
    headquarters = db.Column(db.String)
    hq_country = db.Column(db.String)
    awards_received = db.Column(db.ARRAY(db.JSON))
    website = db.Column(db.String)
    relief_web_id = db.Column(db.String)
    relief_web_url = db.Column(db.String)
    relief_provided = db.Column(db.ARRAY(db.JSON))
    youtube_info = db.Column(db.ARRAY(db.JSON))
    relevant_countries = db.Column(db.ARRAY(db.JSON))
    relevant_newsevents = db.Column(db.ARRAY(db.JSON))


class Country(db.Model):
    __tablename__ = "countries"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    country_iso3 = db.Column(db.String)
    flag_url = db.Column(db.String)
    map_info = db.Column(db.JSON)
    capital = db.Column(db.String)
    num_refugees = db.Column(db.Integer)
    num_asylum_decisions = db.Column(db.Integer)
    year_of_decisions = db.Column(db.Integer)
    num_recognized = db.Column(db.Integer)
    num_other = db.Column(db.Integer)
    num_apps_rejected = db.Column(db.Integer)
    num_closed = db.Column(db.Integer)
    relevant_charities = db.Column(db.ARRAY(db.JSON))
    relevant_newsevents = db.Column(db.ARRAY(db.JSON))


class NewsEvent(db.Model):
    __tablename__ = "newsevents"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    date = db.Column(db.String)
    source = db.Column(db.String)
    image_url = db.Column(db.String)
    disaster_type = db.Column(db.ARRAY(db.String))
    primary_country = db.Column(db.String)
    other_sources = db.Column(db.ARRAY(db.String))
    themes = db.Column(db.ARRAY(db.String))
    orglink = db.Column(db.String)
    relevant_charities = db.Column(db.ARRAY(db.JSON))
    relevant_countries = db.Column(db.ARRAY(db.JSON))
