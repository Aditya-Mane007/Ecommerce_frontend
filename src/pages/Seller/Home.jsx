import axios from "axios"
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SellerNavbar from "./SellerNavbar"

const Home = () => {
  const [products, setProducts] = useState([])
  return (
    <>
      <header>
        <SellerNavbar />
      </header>
      <ul>
        {products.map((product) => (
          <li>{product.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Home
