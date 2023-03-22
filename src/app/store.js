import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/Users/userSlice"
import sellerReducer from "../features/Sellers/sellerSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer
  }
})
