import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { toast } from "react-toastify"
import { getProducts } from "../../features/Sellers/sellerSlice"
import SellerNavbar from "./SellerNavbar"

const Home = () => {
  const dispatch = useDispatch()
  const { products, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.seller
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProducts())
  }, []) // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <ul>
        {products.map((product) => (
          <li>{product.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Home
