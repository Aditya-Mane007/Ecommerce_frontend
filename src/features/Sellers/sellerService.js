import axios from "axios"

const API_URL = "http://localhost:5000/api/sellers/"

const register = async (sellerData) => {
  const response = await axios.post(API_URL,sellerData)
  if (response.data) {
    localStorage.setItem("Seller",JSON.stringify(response.data))
  }

  return response.data
}
const login = async (sellerData) => {
  const response = await axios.post(API_URL + "login",sellerData)
  if (response.data) {
    localStorage.setItem("Seller",JSON.stringify(response.data))
  }

  return response.data
}

const logout = async () => {
  localStorage.removeItem("Seller")
}

// Get All PRoducts
const getProducts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get("http://localhost:5000/api/sellers/product",config)

  return response.data.products
}

const getProduct = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`http://localhost:5000/api/sellers/product/${id}`,config)

  return response.data.product
}

const createProducts = async (productData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post("http://localhost:5000/api/sellers/product/add",productData,config)

  return response.data.products
}


const updateProduct = async (productData,id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(`http://localhost:5000/api/sellers/product/${id}`,productData,config)

  return response.data
}

const deleteProduct = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`http://localhost:5000/api/sellers/product/${id}`,config)

  return response.data
}

const sellerService = {
  register,
  login,
  logout,
  getProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct
}

export default sellerService
