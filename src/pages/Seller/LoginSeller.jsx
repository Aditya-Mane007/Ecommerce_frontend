import React, { useEffect, useState } from "react"
import { CiLogin } from "react-icons/ci"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "../../CSS/Login.css"
import { login, reset } from "../../features/Sellers/sellerSlice"

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { seller, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.seller
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || seller) {
      navigate("/seller/home")
    }
    dispatch(reset())
  }, [seller, isError, isSuccess, message, navigate, dispatch])
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const sellerData = {
      email,
      password
    }
    dispatch(login(sellerData))
  }

  return (
    <>
      <div className="login">
        <div className="heading">
          <Link to="/">ECommerce.in</Link>
        </div>
        <h1 className="title" style={{ fontSize: "30px" }}>
          <CiLogin style={{ margin: "0rem 1rem", fontSize: "50px" }} />
          Login
        </h1>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="examaple@gmail.com"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
          <div className="line"></div>
          <div className="title">New to ECommerce ?</div>
          <div className="form-group">
            <Link to="/seller/register">
              <button className="btn" style={{ color: "white" }}>
                Create a new Ecommerc account
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginUser
