from sqlalchemy import Column, String
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(String, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True)
    department = Column(String)
