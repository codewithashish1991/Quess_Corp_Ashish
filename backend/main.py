from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine
import models, schemas, controller

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://quesscorp-frontend.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/employees")
def add_employee(data: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    try:
        return controller.create_employee(db, data)
    except:
        raise HTTPException(status_code=400, detail="Employee already exists")

@app.get("/employees")
def list_employees(db: Session = Depends(get_db)):
    return controller.get_employees(db)

@app.delete("/employees/{employee_id}")
def remove_employee(employee_id: str, db: Session = Depends(get_db)):
    controller.delete_employee(db, employee_id)
    return {"message": "Employee deleted"}

@app.post("/attendance")
def add_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return controller.mark_attendance(db, data)
