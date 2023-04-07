import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getProducts } from "../../features/Sellers/sellerSlice"
import Cards from "./Cards"
import SellerNavbar from "./SellerNavbar"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, isError, message, seller } = useSelector(
    (state) => state.seller
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!seller) {
      navigate("/seller/login")
    }
    dispatch(getProducts())
  }, [isError, message, dispatch, navigate, seller])
  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <div className="cards">
        {products.length > 0 ? (
          <Cards products={products} />
        ) : (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            No products to show
          </h1>
        )}
      </div>
    </>
  )
}

export default Home
