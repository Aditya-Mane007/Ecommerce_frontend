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


const userService = { register,login,logout,getProducts }

export default userService
