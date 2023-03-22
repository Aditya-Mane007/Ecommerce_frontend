import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"

const user = JSON.parse(localStorage.getItem("User"))

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
}
export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const login = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false
      state.isError = false
      state.isLoading = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer
