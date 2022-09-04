import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  currentEmployee: {
    id: 0,
    name: "",
    email: "",
    password: "",
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload
    },
    loginEmployee: (state, action) => {
      const { name, email, password, id } = action.payload

      state.currentEmployee = {
        id,
        name,
        email,
        password,
      }
    },
  },
})

export const { fillEmployeeList, loginEmployee } = employeeSlice.actions

export default employeeSlice.reducer
