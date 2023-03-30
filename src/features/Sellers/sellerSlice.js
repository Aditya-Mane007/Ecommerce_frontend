import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import sellerService from "./sellerService"

const seller = JSON.parse(localStorage.getItem("Seller"))

const initialState = {
  seller: seller ? seller : null,
  products: [],
  product: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
}
export const register = createAsyncThunk(
  "seller/register",
  async (sellerData,thunkAPI) => {
    try {
      return await sellerService.register(sellerData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const login = createAsyncThunk(
  "seller/login",
  async (sellerData,thunkAPI) => {
    try {
      return await sellerService.login(sellerData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.message &&
          error.response.message.data) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Logout
export const logout = createAsyncThunk(
  "seller/logout",
  async () => {
    await sellerService.logout()
  }
)

// Get Products 
export const getProducts = createAsyncThunk("seller/getAll",async (_,thunkAPI) => {
  try {
    const token = thunkAPI.getState().seller.seller.token
    return await sellerService.getProducts(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.message &&
        error.response.message.data) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
// Get Product
export const getProduct = createAsyncThunk("seller/getOne",async (id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().seller.seller.token
    return await sellerService.getProduct(id,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.message &&
        error.response.message.data) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Create Product
export const createProducts = createAsyncThunk("seller/create",async (productData,thunkAPI) => {
  try {
    const token = thunkAPI.getState().seller.seller.token
    return await sellerService.createProducts(productData,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.message &&
        error.response.message.data) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
// updateProduct
export const updateProduct = createAsyncThunk("seller/update",async (productData,id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().seller.seller.token
    return await sellerService.updateProduct(productData,id,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.message &&
        error.response.message.data) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete Product
export const deleteProduct = createAsyncThunk("seller/delete",async (id,thunkAPI) => {
  try {
    const token = thunkAPI.getState().seller.seller.token
    return await sellerService.deleteProduct(id,token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.message &&
        error.response.message.data) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
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
        state.isError = false
        state.seller = action.payload
      })
      .addCase(register.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.pending,(state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.seller = action.payload
      })
      .addCase(login.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(logout.fulfilled,(state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.seller = null
      })
      .addCase(getProducts.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products = action.payload
      })
      .addCase(getProducts.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getProduct.pending,(state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(getProduct.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createProducts.pending,(state) => {
        state.isLoading = true
      })
      .addCase(createProducts.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products.push(action.payload)
      })
      .addCase(createProducts.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateProduct.pending,(state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(updateProduct.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteProduct.pending,(state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled,(state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products.filter((product) => product.id !== action.payload.id)
      })
      .addCase(deleteProduct.rejected,(state,action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = sellerSlice.actions
export default sellerSlice.reducer
