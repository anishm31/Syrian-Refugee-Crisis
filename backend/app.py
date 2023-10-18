from flask import jsonify, request
from models import app, db, Charity, Country, NewsEvent
from schema import charity_schema, country_schema, newsevent_schema
from sqlalchemy import desc, or_, not_

CHARITIES, COUNTRIES, NEWSEVENTS = 468, 101, 731 #TODO change to num instances

DEFAULT_PAGE_SIZE = 12


@app.route("/")
def home():
    return ""


# Charities API
@app.route("/charities")
def get_charities():
    page = request.args.get("page")
    query = db.session.query(Charity)

    if page is not None:
        query = paginate(query, int(page))

    result = charity_schema.dump(query, many=True)
    return jsonify(
        {
            "count": len(result),
            "data": result,
        }
    )

@app.route("/charities/<name>")
def get_charity(name):
    query = db.session.query(Charity).filter_by(name=name)
    result = charity_schema.dump(query, many=True)[0]
    return jsonify({"data": result})


# Countries API
@app.route("/countries")
def get_countries():
    page = request.args.get("page")
    query = db.session.query(Country)

    if page is not None:
        query = paginate(query, int(page))

    result = country_schema.dump(query, many=True)
    return jsonify(
        {
            "count": len(result),
            "data": result,
        }
    )

@app.route("/countries/<name>")
def get_country(name):
    query = db.session.query(Country).filter_by(name=name)
    result = country_schema.dump(query, many=True)[0]
    return jsonify({"data": result})


#NewsEvents API
@app.route("/news-and-events")
def get_newsevents():
    page = request.args.get("page")
    query = db.session.query(NewsEvent)

    if page is not None:
        query = paginate(query, int(page))

    result = newsevent_schema.dump(query, many=True)
    return jsonify(
        {
            "count": len(result),
            "data": result,
        }
    )

@app.route("/news-and-events/<title>")
def get_newsevent(title):
    query = db.session.query(NewsEvent).filter_by(title=title)
    result = newsevent_schema.dump(query, many=True)[0]
    return jsonify({"data": result})


# Returns a paginated query of the given page number with the given page size
def paginate(query, page_num, page_size=DEFAULT_PAGE_SIZE):
    return query.paginate(page=page_num, per_page=page_size, error_out=False).items


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
