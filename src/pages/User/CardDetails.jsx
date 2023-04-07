import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { BsCurrencyRupee } from "react-icons/bs"
import { getProduct } from "../../features/Products/productSlice"
import Navbar from "../../components/Navbar"
import { addToCart } from "../../features/Users/userSlice"

const CardDetails = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1)

  const { user } = useSelector((state) => state.user)

  const increment = () => {
    setQuantity((prev) => prev + 1)
  }
  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const submitHandler = () => {
    const cartData = {
      user: user._id,
      productInfo: {
        product_id: product._id,
        image: {
          public_id: product.image.public_id,
          url: product.image.url
        },
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        seller: product.seller
      },
      quantity: quantity
    }
    dispatch(addToCart(cartData))
  }

  const { product, isError, message, isSuccess } = useSelector(
    (state) => state.products
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getProduct(params.id))
  }, [params.id, isSuccess, isError, message, navigate, dispatch])

  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="cardDetail">
        <div className="btn-block">
          <div
            className="backbtn btn"
            onClick={() => {
              navigate(-1)
            }}
          >
            <BsArrowLeft style={{ margin: "0rem .5rem" }} />
            Back
          </div>
        </div>
        {product && (
          <div className="productDetails">
            <div className="image">
              <img src={product.image && product.image.url} alt="" />
            </div>
            <div className="product-details">
              <div className="name">{product.name}</div>
              <div className="description">
                <h3 className="desc-title">About this item :</h3>
                {product.description}
              </div>
              <div className="price">
                <h3 className="quan-title">Price :</h3>
                <BsCurrencyRupee />
                {product.price}
              </div>
              <div className="quantity">
                <h3 className="quan-title">Quantity:</h3>
                {product.quantity}
              </div>
              <div className="category">
                <h3 className="quan-title">Category:</h3>
                {product.category}
              </div>

              <div className="btns">
                <div className="btn minus" onClick={decrement}>
                  -
                </div>
                <div className="quantity">{quantity}</div>
                <div className="btn plus" onClick={increment}>
                  +
                </div>
              </div>
              <div className="btns">
                <button
                  type="submit"
                  className="submit btn"
                  style={{ margin: ".5rem 0rem" }}
                  onClick={submitHandler}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CardDetails
