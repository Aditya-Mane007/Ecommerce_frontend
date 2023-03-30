import axios from "axios"

const API_URL = "http://localhost:5000/api/users/products"

const getProducts = async () => {

  const response = await axios.get(API_URL)

  return response.data.products
}


const productService = { getProducts }

export default productService