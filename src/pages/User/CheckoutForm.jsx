import React, { useEffect, useState } from "react"
import Card from "./Card"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../features/Products/productSlice"
import { BsCurrencyRupee } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getCartProductDetails } from "../../features/Users/userSlice"

const CheckoutForm = () => {
  const params = useParams()
  console.log(params.id)
  const dispatch = useDispatch()
  const { checkoutCart } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getCartProductDetails(params.id))
  }, [dispatch, params])

  return (
    <div className="checkout-form">
      <div className="product-info">
        <div className="card">
          <div className="image">
            <img
              src={
                checkoutCart &&
                checkoutCart.productInfo &&
                checkoutCart.productInfo.image &&
                checkoutCart.productInfo.image.url
              }
              alt={checkoutCart && checkoutCart.productInfo.name}
            />
          </div>
          <div className="name">
            {checkoutCart && checkoutCart.productInfo.name}
          </div>
          <div className="decription">
            {checkoutCart && checkoutCart.productInfo.description}
          </div>
          <div className="price">
            <BsCurrencyRupee />
            {checkoutCart && checkoutCart.productInfo.price}
          </div>
          <div className="quantity">
            {checkoutCart && checkoutCart.productInfo.quantity}
          </div>
        </div>
      </div>
      <div className="checkout-form">
        <form action="" className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Adress</label>
            <input type="text" name="address" id="adrress" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Place order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckoutForm
