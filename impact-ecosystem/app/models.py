from sqlalchemy import Column, Integer, String, Float
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    tokens = Column(Float, default=0)
    reputation = Column(Float, default=0)

class Treasury(Base):
    __tablename__ = "treasury"

    id = Column(Integer, primary_key=True)
    total_supply = Column(Float, default=1000000)
    burned = Column(Float, default=0)
    social_fund = Column(Float, default=0)