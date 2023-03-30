import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { BsCurrencyRupee } from "react-icons/bs"
import { deleteProduct, getProduct } from "../../features/Sellers/sellerSlice"

const CardDetails = () => {
  const dispatch = useDispatch()
  let params = useParams()
  let navigate = useNavigate()

  const { product, isError, message } = useSelector((state) => state.seller)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProduct(params.id))
  }, [params.id, dispatch, navigate, isError, message])
  return (
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
              <div
                className="update btn"
                onClick={() => {
                  navigate(`/seller/product/update/${product._id}`)
                }}
              >
                Update
              </div>
              <div
                className="delete btn"
                onClick={() => {
                  dispatch(deleteProduct(product._id))
                  navigate(-1)
                }}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardDetails
