const API = import.meta.env.VITE_API_URL

export async function getEmployees() {
  const res = await fetch(`${API}/employees`)
  if (!res.ok) throw new Error()
  return res.json()
}

export async function addEmployee(data) {
  const res = await fetch(`${API}/employees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error()
}

export async function deleteEmployee(id) {
  const res = await fetch(`${API}/employees/${id}`, { method: "DELETE" })
  if (!res.ok) throw new Error()
}

export async function addAttendance(data) {
  const res = await fetch(`${API}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error()
}