from sqlalchemy import (
    Column,
    Integer,
    Text,
    Boolean,
)

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import (
        scoped_session,
        sessionmaker,
        )

from zope.sqlalchemy import ZopeTransactionExtension

DBSession = scoped_session(
        sessionmaker(extension=ZopeTransactionExtension()))
Base = declarative_base()


class Server(Base):
    __tablename__ = 'servers'
    uid = Column(Integer, primary_key=True)
    address = Column(Text)
    port = Column(Integer)
    useSSL = Column(Boolean)

    def __init__(self, address, port, useSSL):
        self.address = address
        self.port = port
        self.useSSL = useSSL
