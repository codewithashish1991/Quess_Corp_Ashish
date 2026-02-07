import { useDispatch } from "react-redux"
import { deleteEmployee } from "../store/employeeSlice"

export default function EmployeeList({ employees, onSelect }) {
  const dispatch = useDispatch()

  return (
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Dept</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(e => (
          <tr key={e.employee_id}>
            <td>{e.employee_id}</td>
            <td>{e.full_name}</td>
            <td>{e.email}</td>
            <td>{e.department}</td>
            <td>
              <button className="btn btn-sm btn-success me-2"
                onClick={() => onSelect(e.employee_id)}>
                Attendance
              </button>
              <button className="btn btn-sm btn-danger"
                onClick={() => dispatch(deleteEmployee(e.employee_id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
