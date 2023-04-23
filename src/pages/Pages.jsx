import React from "react"
import RegisterUser from "./User/RegisterUser"
import LoginUser from "./User/LoginUser"
import LoginSeller from "./Seller/LoginSeller"
import RegisterSeller from "./Seller/RegisterSeller"
import Home from "../components/Home"
import SellerHome from "../pages/Seller/Home"
import AddProduct from "../pages/Seller/Addproduct"
import CardDetails from "./Seller/CardDetails"
import UserCardDetails from "./User/CardDetails"

import { Routes, Route } from "react-router-dom"
import UpdateProduct from "./Seller/UpdateProduct"
import CartDetails from "./User/CartDetails"
import PaymentSuccessPage from "./User/PaymentSuccess"
import PaymentFailed from "./User/PaymentFailed"
import CheckoutForm from "./User/CheckoutForm"

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/product/:id" element={<UserCardDetails />} />
        <Route path="/users/cart" element={<CartDetails />} />
        <Route path="/users/cart/:id/checkout" element={<CheckoutForm />} />
        <Route path="/users/paymentSuccess" element={<PaymentSuccessPage />} />
        <Route path="/users/paymentFailed" element={<PaymentFailed />} />
        {/* SELLER */}
        <Route path="seller/login" element={<LoginSeller />} />
        <Route path="seller/register" element={<RegisterSeller />} />
        <Route path="seller/home" element={<SellerHome />} />
        <Route path="seller/home/add" element={<AddProduct />} />
        <Route path="seller/product/:id" element={<CardDetails />} />
        <Route path="seller/product/update/:id" element={<UpdateProduct />} />
      </Routes>
    </>
  )
}

export default Pages
