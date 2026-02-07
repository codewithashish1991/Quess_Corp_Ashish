import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEmployees } from "./../store/employeeSlice"
import EmployeeForm from "./../components/EmployeeForm"
import EmployeeList from "./../components/EmployeeList"
import Attendance from "./../components/Attendance"

export default function App() {
  const dispatch = useDispatch()
  const { list } = useSelector(state => state.employees)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="mb-4">HRMS Lite</h2>
      <EmployeeForm />
      <EmployeeList employees={list} onSelect={setSelectedEmployee} />
      <Attendance employeeId={selectedEmployee} />
    </div>
  )
}
