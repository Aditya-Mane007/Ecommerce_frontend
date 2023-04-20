import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import CartCard from "./CartCard"
import { getCart } from "../../features/Users/userSlice"
import Navbar from "../../components/Navbar"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

const CartDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, cart, isError, isSuccess, message } = useSelector(
    (state) => state.user
  )

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (isError) {
      toast.error(message)
    }

    dispatch(getCart())
  }, [dispatch, navigate, isError, isSuccess, message])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="cards">
        {cart && cart.length < 1 ? (
          <h1 style={{ width: "100%", textAlign: "center" }}>
            Cart is Empty
            <br />
            <p>
              <Link to="/" style={{ textDecoration: "none" }}>
                Go Shop
              </Link>
            </p>
          </h1>
        ) : (
          cart.map((product) => (
            <CartCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  )
}

export default CartDetails
