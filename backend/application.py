from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

DEFAULT_PAGE_SIZE = 12

# Set up Flask app and CORS
flaskApp = Flask(__name__)
CORS(flaskApp)
flaskApp.config[
    "SQLALCHEMY_DATABASE_URI"
] = "mysql+pymysql://admin:wsHxSdz0cSqqYu82SWrT@database-mmaps.cpt6ed6ivedi.us-west-2.rds.amazonaws.com:3306/database_mmaps"
db = SQLAlchemy(flaskApp)

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

    def as_dict(self):
        fields = {}
        for c in self.__table__.columns:
            fields[c.name] = getattr(self, c.name)
        return fields


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

    def as_dict(self):
        fields = {}
        for c in self.__table__.columns:
            fields[c.name] = getattr(self, c.name)
        return fields


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

    def as_dict(self):
        fields = {}
        for c in self.__table__.columns:
            fields[c.name] = getattr(self, c.name)
        return fields


# API
@flaskApp.route("/")
def home():
    return "Hello I am Here!"

@flaskApp.route("/whois/<name>")
def whois(name):
    return "Hello, " + name + ", that is your name!"

# Get all the charities
@flaskApp.route("/charities")
def get_charities():
    page = request.args.get("page")
    query = db.session.query(Charity)

    if page is not None:
        query = paginate(query, int(page))

    charity_list = []
    for charity in query:
        charity_list.append(charity.as_dict())
    
    return jsonify(
        {
            "count": len(charity_list),
            "data": charity_list,
        }
    )

# Get a specific charity
@flaskApp.route("/charities/<name>")
def get_charity(name):
    charity = db.session.query(Charity).filter_by(name=name).first()
    if charity is None:
        status = "Charity not found"
        return Response(status, status=404)
    
    return jsonify(
        {
            "count": 1,
            "data": charity.as_dict(),
        }
    )

# Get all the countries
@flaskApp.route("/countries")
def get_countries():
    page = request.args.get("page")
    query = db.session.query(Country)

    if page is not None:
        query = paginate(query, int(page))

    country_list = []
    for country in query:
        country_list.append(country.as_dict())
    
    return jsonify(
        {
            "count": len(country_list),
            "data": country_list,
        }
    )

# Get a specific country
@flaskApp.route("/countries/<name>")
def get_country(name):
    country = db.session.query(Country).filter_by(name=name).first()
    if country is None:
        status = "Country not found"
        return Response(status, status=404)

    return jsonify(
        {
            "count": 1,
            "data": country.as_dict(),
        }
    )


def paginate(query, page_num, page_size=DEFAULT_PAGE_SIZE):
    return query.paginate(page=page_num, per_page=page_size, error_out=False).items


if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True)