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
  const response = await axios.get(API_URL + "products")
  return response.data
}


const sellerService = {
  register,
  login,
  logout,
  getProducts
}

export default sellerService
