import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAttendance, markAttendance } from "../store/attendanceSlice"

export default function Attendance({ employeeId }) {
  const dispatch = useDispatch()
  const { records } = useSelector(state => state.attendance)

  const [form, setForm] = useState({
    date: "",
    status: "Present"
  })

  useEffect(() => {
    if (employeeId) dispatch(fetchAttendance(employeeId))
  }, [employeeId])

  function submit(e) {
    e.preventDefault()
    dispatch(markAttendance({ employee_id: employeeId, ...form }))
  }

  if (!employeeId) return null

  return (
    <div className="card mt-4">
      <div className="card-header fw-bold">Attendance</div>
      <div className="card-body">
        <form onSubmit={submit} className="row g-3 mb-3">
          <div className="col-md-4">
            <input type="date" className="form-control"
              onChange={e => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="col-md-4">
            <select className="form-select"
              onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-primary w-100">Mark</button>
          </div>
        </form>

        <table className="table table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
