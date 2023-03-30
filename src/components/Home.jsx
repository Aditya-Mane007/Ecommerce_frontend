import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../features/Products/productSlice"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { toast } from "react-toastify"
import Cards from "../pages/User/Cards"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.products
  )
  const { user } = useSelector((state) => state.user)

  useMemo(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      navigate("/users/login")
    }
    dispatch(getProducts())
  }, [])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="cards">
        {products.length > 0 ? (
          <Cards products={products} />
        ) : (
          <h1 style={{ width: "100%", textAlign: "center" }}>Loading...</h1>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Home
