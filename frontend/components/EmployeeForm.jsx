import { useState } from "react"
import { useDispatch } from "react-redux"
import { addEmployee } from "../store/employeeSlice"

export default function EmployeeForm() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  })

  function submit(e) {
    e.preventDefault()
    dispatch(addEmployee(form))
    setForm({ employee_id: "", full_name: "", email: "", department: "" })
  }

  return (
    <div className="card mb-4">
      <div className="card-header fw-bold">Add Employee</div>
      <div className="card-body">
        <form onSubmit={submit} className="row g-3">
          <div className="col-md-3">
            <input className="form-control" placeholder="Employee ID"
              value={form.employee_id}
              onChange={e => setForm({ ...form, employee_id: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Full Name"
              value={form.full_name}
              onChange={e => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="col-md-2">
            <input className="form-control" placeholder="Department"
              value={form.department}
              onChange={e => setForm({ ...form, department: e.target.value })} />
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary w-100">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}
