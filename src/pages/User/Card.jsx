import React from "react"
import { BsCurrencyRupee } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const Card = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/product/${product.id}`)
      }}
    >
      <div className="image">
        <img src={product.image.url} alt={product.name} />
      </div>
      <div className="name">{product.name}</div>
      <div className="decription">{product.description}</div>
      <div className="price">
        <BsCurrencyRupee />
        {product.price}
      </div>
    </div>
  )
}

export default Card
