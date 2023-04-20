import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, reset } from "../features/Products/productSlice"
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

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!user) {
      navigate("/login")
    }

    dispatch(getProducts())
  }, [isSuccess, isError, isLoading, message, dispatch, user, navigate])

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
