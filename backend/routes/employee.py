from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.employee import Employee
from schemas.employee import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/")
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    exists = db.query(Employee).filter(Employee.employee_id == emp.employee_id).first()
    if exists:
        raise HTTPException(status_code=400, detail="Employee already exists")

    db.add(Employee(**emp.dict()))
    db.commit()
    return emp

@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@router.delete("/{employee_id}")
def delete_employee(employee_id: str, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()
    return {"message": "Deleted"}
