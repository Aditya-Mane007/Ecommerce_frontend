import React from "react"
import { BsCurrencyRupee } from "react-icons/bs"
import { Link } from "react-router-dom"

const Card = ({ product }) => {
  return (
    <div className="card">
      <div className="image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image && product.image.url} alt={product.name} />
        </Link>
      </div>
      <div className="name">{product.name}</div>
      <div className="decription">{product.description}</div>
      <div className="price">
        <BsCurrencyRupee />
        {product.price}
      </div>
      <div className="quantity">{product.quantity}</div>
    </div>
  )
}

export default Card
