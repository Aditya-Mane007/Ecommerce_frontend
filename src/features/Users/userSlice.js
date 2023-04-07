import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import userService from "./userService"

const user = JSON.parse(localStorage.getItem("User"))

const initialState = {
  user: user ? user : null,
  cart: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
}
export const register = createAsyncThunk(
  "user/register",
  async (userData,thunkAPI) => {
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
  async (userData,thunkAPI) => {
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


// Logout
export const logout = createAsyncThunk(
  "user/logout",
  async () => {
    await userService.logout()
  }
)

// Add To Cart 
export const addToCart = createAsyncThunk("user/addToCart",async (cartData,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await userService.addToCart(cartData,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getCart = createAsyncThunk("user/getCart",async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await userService.getCart(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteCartProduct = createAsyncThunk("user/deleteCartProduct",async (id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user.token
    return await userService.deleteCartProduct(id,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


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
      .addCase(register.pending,(state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(login.pending,(state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
      .addCase(logout.fulfilled,(state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = null
      })
      .addCase(addToCart.pending,(state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(addToCart.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.cart = []
        state.message = action.payload
      })
      .addCase(getCart.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getCart.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart = action.payload
      })
      .addCase(getCart.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.cart = []
        state.message = action.payload
      })
      .addCase(deleteCartProduct.pending,(state) => {
        state.isLoading = true
      })
      .addCase(deleteCartProduct.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cart.filter((product) => product._id !== action.payload.id)
      })
      .addCase(deleteCartProduct.rejected,(state,action) => {
        state.isLoading = false
        state.isError = true
        state.cart = []
        state.message = action.payload
      })
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer
