import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createProducts } from "../../features/Sellers/sellerSlice"
import SellerNavbar from "./SellerNavbar"

const Addproduct = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    quantity: ""
  })

  const { name, description, price, image, quantity } = formData
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const productData = {
      name,
      description,
      price,
      image,
      quantity
    }
    dispatch(createProducts(productData))
    setFormData("")
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
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="images" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              name="images"
              id="images"
              multiple={true}
              className="images"
              accept="image/*"
              required
              style={{ border: "none" }}
              onChange={onChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="quntity">Quantity</label>
          <input type="text" name="quntity" id="quntity" onChange={onChange} />
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
