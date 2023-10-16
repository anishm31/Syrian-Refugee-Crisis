from flask import Flask, send_from_directory
from flask import request
import sqlalchemy as sqla
import sqlalchemy.orm as orm
import orm_classes as oc

app = Flask(__name__)

@app.route("/", defaults={'path':''})
def setup():
    user= ''
    password=''
    db_url = ''
    # port = 
    db_name = ''
    full_db_url = ''

    global engine, session, base, Base
    base = orm.DeclarativeBase
    engine = sqla.create_engine(full_db_url, echo=True)
    oc.intitialize_sql(engine, base)

    session_maker = orm.sessionmaker(engine)
    session = session_maker()
    Base = oc.Base
    oc.Base.metadata.bind = engine
    oc.Base.metadata.create_all(engine)


# Have to create instaces of charity, country, and news as well as their relationships 

@app.route('/get_country', methods=['GET'])
def get_country():
    temp=''
    return temp

@app.route('/get_all_countries', methods=['GET'])
def get_all_countries():
    temp=''
    return temp
@app.route('/get_charity', methods=['GET'])
def get_charity():
    temp=''
    return temp

@app.route('/get_all_charities', methods=['GET'])
def get_all_charities():
    temp=''
    return temp
@app.route('/get_event', methods=['GET'])
def get_event():
    temp=''
    return temp

@app.route('/get_all_events', methods=['GET'])
def get_event():
    temp=''
    return temp