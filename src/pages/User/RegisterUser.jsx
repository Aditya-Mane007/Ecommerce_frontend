import React, { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../../CSS/Register.css"
import { toast } from "react-toastify"
import { register, reset } from "../../features/Users/userSlice"

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: ""
  })
  const { name, email, password1, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.user
  )

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (password1 !== password2) {
      toast.error("Password do not match")
    } else {
      const userData = {
        name,
        email,
        password: password1
      }
      dispatch(register(userData))
    }
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate("/")
    }
    dispatch(reset())
  }, [user, isError, message, isSuccess, navigate, dispatch])
  return (
    <>
      <div className="register">
        <div className="heading">
          <Link to="/">ECommerce.in</Link>
        </div>
        <h1 className="title" style={{ fontSize: "30px" }}>
          <FaUser style={{ margin: "0rem 1rem", fontSize: "50px" }} />
          Register
        </h1>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eamil">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="examaple@gmail.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              name="password1"
              id="password1"
              value={password1}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default RegisterUser
