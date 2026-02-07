from sqlalchemy.orm import Session
from models import Employee, Attendance

def create_employee(db: Session, data):
    employee = Employee(**data.dict())
    db.add(employee)
    db.commit()
    db.refresh(employee)
    return employee

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, employee_id: str):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if emp:
        db.delete(emp)
        db.commit()

def mark_attendance(db: Session, data):
    attendance = Attendance(**data.dict())
    db.add(attendance)
    db.commit()
    return attendance
