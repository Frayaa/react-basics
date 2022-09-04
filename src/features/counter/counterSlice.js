import { createSlice } from "@reduxjs/toolkit"
import { addScaleCorrector } from "framer-motion"

const initialState = {
  value: 17,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    overwriteValue: (state, action) => {
      state.value = action.payload
    },
  },
})

// action adalah function yang akan return sebuah "Action Object"
// "ACTION OBJECT" isinya:
// -TYPE
// - PAYLOAD (optional)

// Reducer addScaleCorrectorlah kumpulan condition yang akan mengubah isi global state
// setiap condition dari reducer akan ngecek "type" dari ACTION OBJECT
// yang artinya perubahan isi global state, akan ditentukan
// berdasarkan type action object yang dikirm ke reducer

// Nama function di reducer/action akan menjaadi nama type di reducer
// untuk mengganti isi store

// contoh: ada function

export const { increment, decrement, reset, overwriteValue } =
  counterSlice.actions

export default counterSlice.reducer
