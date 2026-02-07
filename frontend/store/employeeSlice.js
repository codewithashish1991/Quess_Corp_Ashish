import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API = import.meta.env.VITE_API_URL

export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async () => {
    const res = await fetch(`${API}/employees`)
    return res.json()
  }
)

export const addEmployee = createAsyncThunk(
  "employees/add",
  async (data) => {
    await fetch(`${API}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    return data
  }
)

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id) => {
    await fetch(`${API}/employees/${id}`, { method: "DELETE" })
    return id
  }
)

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: ""
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.loading = true
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchEmployees.rejected, state => {
        state.loading = false
        state.error = "Failed to load"
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload)
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.employee_id !== action.payload)
      })
  }
})

export default employeeSlice.reducer