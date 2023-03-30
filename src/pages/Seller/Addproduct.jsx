import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createProducts } from "../../features/Sellers/sellerSlice"
import SellerNavbar from "./SellerNavbar"

const Addproduct = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: ""
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

    dispatch(createProducts(formData))
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: ""
    })
  }

  return (
    <div>
      <header>
        <SellerNavbar />
      </header>
      <form className="form" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name of the product</label>
          <input type="text" name="name" id="name" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" onChange={onChange} />
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
              required
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
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addproduct
