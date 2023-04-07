import axios from "axios"

const API_URL = "http://localhost:5000/api/users/products/"

const getProducts = async () => {

  const response = await axios.get(API_URL)

  return response.data.products
}

const getProduct = async (id) => {

  const response = await axios.get(`http://localhost:5000/api/users/products/${id}`)
  
  return response.data.product
}
const productService = { getProducts,getProduct }

export default productService