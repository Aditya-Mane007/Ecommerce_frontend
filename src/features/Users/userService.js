import axios from "axios"
const API_URL = "http://localhost:5000/api/users/"

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem("User", JSON.stringify(response.data))
  }

  return response.data
}
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData)

  if (response.data) {
    localStorage.setItem("User", JSON.stringify(response.data))
  }

  return response.data
}
const userService = { register, login }

export default userService
