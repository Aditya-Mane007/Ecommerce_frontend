import axios from "axios"
const API_URL = "http://localhost:5000/api/users/"

const register = async (userData) => {
  const response = await axios.post(API_URL,userData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}
const login = async (userData) => {
  const response = await axios.post(API_URL + "login",userData)

  if (response.data) {
    localStorage.setItem("User",JSON.stringify(response.data))
  }

  return response.data
}
const logout = async () => {
  localStorage.removeItem("User")
}
const getProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/users/products")
  return response.data.products
}

const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get("http://localhost:5000/api/users/cart",config)

  return response.data.products
}
const getCartProductDetails = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`http://localhost:5000/api/users/cart/${id}`,config)

  return response.data.products
}

const addToCart = async (cartData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post("http://localhost:5000/api/users/cart/add",cartData,config)

  return response.data.products
}
const deleteCartProduct = async (id,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`http://localhost:5000/api/users/cart/${id}`,config)

  return response.data.products
}

const userService = { register,login,logout,getProducts,addToCart,getCart,getCartProductDetails,deleteCartProduct }

export default userService
