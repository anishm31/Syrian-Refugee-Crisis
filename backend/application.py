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
    return "Hello I Am Here!"


# Get all the charities
@flaskApp.route("/charities")
def get_charities():
    page = request.args.get("page")
    sort_order = request.args.get("sortOrder")
    sort_by_val = request.args.get("sortBy")
    
    # Create val to store retrieved rows
    retrievals = None
    
    if sort_order is not None and sort_by_val is not None:
        # Perform query with sorting
        retrievals = sort_charities(sort_by_val, sort_order)
        if retrievals is None:
            status = f"Invalid sortBy or sortOrder: sortBy={sort_by_val}, sortOrder={sort_order}"
            return Response(status, status=404)
    else:
        # Perform standard query of all charities
        retrievals = db.session.query(Charity)

    if page is not None:
        retrievals = paginate(retrievals, int(page))

    charity_list = []
    for charity in retrievals:
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
    useShortName = request.args.get("shortName")
    charity = None
    if useShortName is not None and useShortName == "true":
        charity = db.session.query(Charity).filter_by(short_name=name).first()
    else:
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
    sort_order = request.args.get("sortOrder")
    sort_by_val = request.args.get("sortBy")
    
    # Create variable for storing retrieved rows
    retrievals = None
    
    if sort_order is not None and sort_by_val is not None:
        # Perform query with sorting
        retrievals = sort_countries(sort_by_val, sort_order)
        if retrievals is None:
            status = f"Invalid sortBy or sortOrder: sortBy={sort_by_val}, sortOrder={sort_order}"
            return Response(status, status=404)
    else:
        # Perform standard query of all countries
        retrievals = db.session.query(Country)

    if page is not None:
        retrievals = paginate(retrievals, int(page))

    country_list = []
    for country in retrievals:
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

# Get all the newsevents
@flaskApp.route("/news-and-events")
def get_newsevents():
    page = request.args.get("page")
    sort_order = request.args.get("sortOrder")
    sort_by_val = request.args.get("sortBy")
    
    # Declare variable to store retrieved rows
    retrievals = None
    
    if sort_order is not None and sort_by_val is not None:
        # Perform query with sorting
        retrievals = sort_news_events(sort_by_val, sort_order)
        if retrievals is None:
            status = f"Invalid sortBy or sortOrder: sortBy={sort_by_val}, sortOrder={sort_order}"
            return Response(status, status=404)
    else:
        # Perform standard query of all newsevents
        retrievals = db.session.query(NewsEvent)

    if page is not None:
        retrievals = paginate(retrievals, int(page))

    newsevent_list = []
    for newsevent in retrievals:
        newsevent_list.append(newsevent.as_dict())
    
    return jsonify(
        {
            "count": len(newsevent_list),
            "data": newsevent_list,
        }
    )

# Get a specific newsevent
@flaskApp.route("/news-and-events/<title>")
def get_newsevent(title):
    newsevent = db.session.query(NewsEvent).filter(NewsEvent.title.ilike(f"%{title}%")).first()
    if newsevent is None:
        status = "News/Event not found"
        return Response(status, status=404)

    return jsonify(
        {
            "count": 1,
            "data": newsevent.as_dict(),
        }
    )


def paginate(query, page_num, page_size=DEFAULT_PAGE_SIZE):
    return query.paginate(page=page_num, per_page=page_size, error_out=False).items

# Sort country instances based on sortBy and sortOrder API arguments
def sort_countries(sort_by_val, sort_order):
    # Determine order of the sorting
    sort_by_ascending = None
    if sort_order == "asc":
        sort_by_ascending = True
    elif sort_order == "desc":
        sort_by_ascending = False
    else:
        # Invalid sortOrder
        return None
        
    # Determine column to sort by
    sort_by_column = None
    if sort_by_val == "countryName":
        sort_by_column = Country.name
    elif sort_by_val == "totalRefugees":
        sort_by_column = Country.num_refugees
    elif sort_by_val == "totalAsylumDecisions":
        sort_by_column = Country.num_asylum_decisions
    elif sort_by_val == "yearOfDecisions":
        sort_by_column = Country.year_of_decisions
    elif sort_by_val == "totalRecognized":
        sort_by_column = Country.num_recognized
    elif sort_by_val == "numGranted":
        sort_by_column = Country.num_recognized
    elif sort_by_val == "numRejected":
        sort_by_column = Country.num_apps_rejected
    else:
        # Return None to indicate sortBy column or sort order is invalid
        return None
        
    # Perform query with sorting and return retrievals
    return db.session.query(Country).order_by(sort_by_column.asc() if sort_by_ascending else sort_by_column.desc())

# Sort charity instances based on sortBy and sortOrder API arguments
def sort_charities(sort_by_val, sort_order):
    # Determine order of sorting
    sort_by_ascending = None
    if sort_order == "asc":
        sort_by_ascending = True
    elif sort_order == "desc":
        sort_by_ascending = False
    else:
        # Invalid sortOrder
        return None

    # Determine column to sort by
    sort_by_column = None
    if sort_by_val == "charityName":
        sort_by_column = Charity.name
    elif sort_by_val == "yearEstablished":
        sort_by_column = Charity.established
    elif sort_by_val == "numAwards":
        sort_by_column = Charity.awards_received
    elif sort_by_val == "numReliefTypes":
        sort_by_column = Charity.relief_provided
    else:
        # Invalid sortBy arugment
        return None
    
    # Perform query with sorting and return retrievals
    return db.session.query(Charity).order_by(sort_by_column.asc() if sort_by_ascending else sort_by_column.desc())

# Sort news/events instances based on sortBy and sortOrder API arguments
def sort_news_events(sort_by_val, sort_order):
    # Determine order of sorting
    sort_by_ascending = None
    if sort_order == "asc":
        sort_by_ascending = True
    elif sort_order == "desc":
        sort_by_ascending = False
    else:
        # Invalid sortOrder
        return None
    
    # Determine column to sort by
    sort_by_column = None
    if sort_by_val == "title":
        sort_by_column = NewsEvent.title
    elif sort_by_val == "date":
        sort_by_column = NewsEvent.date
    elif sort_by_val == "numSources":
        sort_by_column = NewsEvent.sources
    elif sort_by_val == "numThemes":
        sort_by_column = NewsEvent.themes
    else:
        # Invalid sortBy argument
        return None
    
    # Perform query with sorting and return retrievals
    return db.session.query(NewsEvent).order_by(sort_by_column.asc() if sort_by_ascending else sort_by_column.desc())

if __name__ == "__main__":
    flaskApp.run(port=5000, debug=True)