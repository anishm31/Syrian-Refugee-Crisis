import sqlalchemy as sqla

DBSession = sqla.orm.scoped_session(sqla.orm.sessionmaker())
# DBSession = None
Base = sqla.orm.registry().generate_base()
# Base = None

def initialize_sql(engine, base):
    global Base, DBSession
    class Base (base):
        pass
    # Base = base
    # DBSession.configure(bind=engine)
    # Base.metadata.bind = engine
    # Base.metadata.create_all(engine)

# Makes it so that all files in orm_classes are imported when calling 'import orm_classes'
from os.path import dirname, basename, isfile, join
import glob
modules = glob.glob(join(dirname(__file__), "*.py"))
__all__ = [ basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]
from . import * 
