import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { BsArrowLeft } from "react-icons/bs"
import { toast } from "react-toastify"
import { updateProduct } from "../../features/Sellers/sellerSlice"
import { getProduct } from "../../features/Sellers/sellerSlice"
import SellerNavbar from "./SellerNavbar"

const UpdateProduct = () => {
  const dispatch = useDispatch()
  let params = useParams()
  let navigate = useNavigate()

  const { product, isError, message } = useSelector((state) => state.seller)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getProduct(params.id))
  }, [params.id, isError, message, navigate, dispatch])

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: !product.quantity ? 1 : product.quantity,
    category: product.category
  })
  const [image, setImage] = useState("")

  const { name, description, price, quantity, category } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("image", image)
    formData.append("quantity", quantity)
    formData.append("category", category)

    dispatch(updateProduct(formData, product._id))
    // setFormData({
    //   name: "",
    //   description: "",
    //   price: "",
    //   quantity: "",
    //   category: ""
    // })
  }

  return (
    <div>
      <header>
        <SellerNavbar />
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
      </header>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name of the product</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              name="image"
              id="image"
              multiple={true}
              className="image"
              accept="image/*"
              style={{ border: "none" }}
              onChange={(e) => {
                setImage(e.target.files[0])
              }}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Update Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProduct
