from flask import Flask
import sqlalchemy as db
from sqlalchemy import Integer, Column, String, Table, MetaData, Float, JSON
import time
import json
from model import Charity

db_url = "mysql://admin:bWETUBol22kcXqpAfr9R@database-syrian-refugee-crisis.ct6yjt2fdsku.us-east-2.rds.amazonaws.com:3306/database-syrian-refugee-crisis?charset=utf8"


# Creates a database
def createDatabase():
    engine = db.create_engine(db_url)
    engine.execute("CREATE DATABASE database-syrian-refugee-crisis")
    engine.execute("USE database-syrian-refugee-crisis")


# Sets up database with required tables
def setupDatabase():
    engine = db.create_engine(db_url)
    conn = engine.connect()
    metadata = db.MetaData()

    dictionary = {"id": 1, "name": "test", "org_type": ["test1", "test2"]}
    db.session.add(Charity(**dictionary))
    
    
    
    db.session.commit()

    charitiesJSON = open("charity_db.json")
    charities = json.load(charitiesJSON)
    for charity in charities:
        attributes = charity["attributes"]
        query = db.insert(Charities).values(
            id = charity["id"] + 1,
            name = charity["name"],
            description = attributes["description"],
            org_type = attributes["org_type"],
            logo_img = attributes["logo_img"],
            org_img = attributes["org_img"],
            established = attributes["established"],
            short_name = attributes["short_name"],
            long_name = attributes["long_name"],
            parent_org = attributes["parent_org"],
            headquarters = attributes["headquarters"],
            hq_country = attributes["hq_country"],
            awards_received = attributes["awards_received"],
            website = attributes["website"],
            relief_web_id = attributes["relief_web_id"],
            relief_web_url = attributes["relief_web_url"]
            relief_provided = attributes["relief_provided"],
            youtube_info = attributes["youtube_info"],
            relevant_countries = attributes["relevant_countries"],
            #relevant_newsevents = attributes["relevant_newsevents"],
        )
        Result = conn.execute(query)

    Countries = Table(
        "countries",
        metadata,
        Column("id", Integer, primary_key=True),
        Column("name", String()),
        Column("country_iso3", String(3)),
        Column("flag_url", String()), #find max
        Column("map_info", JSON),
        Column("capital", String()),
        Column("num_refugees", Integer),
        Column("num_asylum_decisions", Integer),
        Column("year_of_decisions", Integer),
        Column("num_recognized", Integer),
        Column("num_other", Integer),
        Column("num_apps_rejected", Integer),
        Column("num_closed", Integer),
        Column("relevant_charities", JSON),
        Column("relevant_newsevents", JSON),
    )
    

    metadata.create_all(engine)


if __name__ == "__main__":
    print("Initializing database...")
    # setupDatabase()
    # createDatabase()
    print("Database initialization complete...")
