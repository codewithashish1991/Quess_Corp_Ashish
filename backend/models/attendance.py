from sqlalchemy import Column, Integer, String, Date, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)
    employee_id = Column(
        String,
        ForeignKey("employees.employee_id", ondelete="CASCADE"),
        nullable=False
    )
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False)

    employee = relationship("Employee", back_populates="attendance")
