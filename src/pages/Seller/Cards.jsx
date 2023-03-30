import React from "react"
import Card from "./Card"
import "../../CSS/Cards.css"

const Cards = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </>
  )
}

export default Cards
