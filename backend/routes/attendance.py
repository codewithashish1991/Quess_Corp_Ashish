from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.attendance import Attendance
from models.employee import Employee
from schemas.attendance import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/")
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.employee_id == data.employee_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    record = Attendance(**data.dict())
    db.add(record)
    db.commit()
    return data

@router.get("/{employee_id}")
def get_attendance(employee_id: str, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).all()
