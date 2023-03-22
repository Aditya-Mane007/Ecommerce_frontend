import React from "react"
import SellerNavbar from "./SellerNavbar"

const Addproduct = () => {
  return (
    <div>
      <header>
        <SellerNavbar />
      </header>
      <form className="form">
        <div className="form-group">
          <label htmlFor="name">Name of the product</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <textarea name="desc" id="desc" cols="30" rows="10"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" id="price" />
        </div>
        <div className="form-group">
          <label htmlFor="quntity">Quantity</label>
          <input type="text" name="quntity" id="quntity" />
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
