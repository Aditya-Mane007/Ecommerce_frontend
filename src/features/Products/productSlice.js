import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import productService from "./productService"


const initialState = {
  products: [],
  product: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
}

// getProducts
export const getProducts = createAsyncThunk("product/getAll",async (_,thunkAPI) => {
  try {

    return await productService.getProducts()
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

export const getProduct = createAsyncThunk("product/getOne",async (id,thunkAPI) => {
  try {
    return await productService.getProduct(id)
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


export const productsSlice = createSlice({
  name: "product",
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
      .addCase(getProducts.pending,(state) => {
        state.isLoading = false
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
        state.isLoading = false
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
  }
})

export const { reset } = productsSlice.actions
export default productsSlice.reducer