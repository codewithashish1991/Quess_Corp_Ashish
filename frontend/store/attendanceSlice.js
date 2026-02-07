import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API = import.meta.env.VITE_API_URL

export const fetchAttendance = createAsyncThunk(
  "attendance/fetch",
  async (employeeId) => {
    const res = await fetch(`${API}/attendance/${employeeId}`)
    return res.json()
  }
)

export const markAttendance = createAsyncThunk(
  "attendance/mark",
  async (data) => {
    const res = await fetch(`${API}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    return res.json()
  }
)

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    records: [],
    loading: false
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAttendance.pending, state => {
        state.loading = true
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false
        state.records = action.payload
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.records.push(action.payload)
      })
  }
})

export default attendanceSlice.reducer
