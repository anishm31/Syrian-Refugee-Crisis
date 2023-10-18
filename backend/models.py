from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# Set up Flask app and CORS
app = Flask(__name__)
CORS(app)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:wsHxSdz0cSqqYu82SWrT@database-mmaps.cpt6ed6ivedi.us-west-2.rds.amazonaws.com:3306/database_mmaps"
db = SQLAlchemy(app)

# This class defines the MySQL table for charity instances
class Charity(db.Model):
    __tablename__ = "charity"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    org_type = db.Column(db.JSON)
    logo_img = db.Column(db.String(200))
    org_img = db.Column(db.String(200), nullable=True)
    established = db.Column(db.String(50))
    short_name = db.Column(db.String(50))
    long_name = db.Column(db.String(100), nullable=True)
    parent_org = db.Column(db.String(60), nullable=True)
    headquarters = db.Column(db.String(50), nullable=True)
    hq_country = db.Column(db.String(70))
    awards_received = db.Column(db.JSON, nullable=True)
    website = db.Column(db.String(100))
    relief_web_id = db.Column(db.Integer)
    relief_web_url = db.Column(db.String(100))
    relief_provided = db.Column(db.JSON)
    youtube_info = db.Column(db.JSON)
    relevant_countries = db.Column(db.JSON, nullable=True)
    relevant_news_events = db.Column(db.JSON, nullable=True)

# This class defines the MySQL table for country instances
class Country(db.Model):
    __tablename__ = "country"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(70))
    country_iso3 = db.Column(db.String(5))
    flag_url = db.Column(db.String(200))
    map_info = db.Column(db.JSON)
    capital = db.Column(db.JSON)
    num_refugees = db.Column(db.Integer)
    num_asylum_decisions = db.Column(db.Integer)
    year_of_decisions = db.Column(db.Integer)
    num_recognized = db.Column(db.Integer)
    num_other = db.Column(db.Integer)
    num_apps_rejected = db.Column(db.Integer)
    num_closed = db.Column(db.Integer)
    relevant_charities = db.Column(db.JSON, nullable=True)
    relevant_news_events = db.Column(db.JSON, nullable=True)

# This class defines the MySQL table for news/events instances
class NewsEvent(db.Model):
    __tablename__ = "news_events"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(400))
    date = db.Column(db.String(50))
    image_url = db.Column(db.JSON, nullable=True)
    disaster_type = db.Column(db.JSON, nullable=True)
    primary_country = db.Column(db.String(30))
    country_iso3 = db.Column(db.String(5))
    sources = db.Column(db.JSON)
    themes = db.Column(db.JSON)
    org_link = db.Column(db.String(60))
    video_url = db.Column(db.JSON)
    source_ids = db.Column(db.JSON)
    relevant_charities = db.Column(db.JSON, nullable=True)
    relevant_countries = db.Column(db.JSON, nullable=True)
