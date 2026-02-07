from sqlalchemy import Column, String
from database import Base

class Employee(Base):
    __tablename__ = "employees"

    employee_id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    department = Column(String, nullable=False)

    attendance = relationship(
        "Attendance",
        back_populates="employee",
        cascade="all, delete",
        passive_deletes=True
    )

