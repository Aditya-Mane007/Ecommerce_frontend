import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineClose
} from "react-icons/ai"
import { BiNotepad, BiSearchAlt } from "react-icons/bi"
import { GiHamburgerMenu } from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux"
import "../CSS/Navbar.css"
import { getCart, logout } from "../features/Users/userSlice"

const Navbar = () => {
  const [isClosed, setIsClosed] = useState(true)
  const { user, cart, isSuccess, isError } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")

  const submitHandler = () => {}

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch, isSuccess, isError])
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/">ECommerce</Link>
        </div>
        <div className="searchBar">
          <div className="form-group">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="search"
                id="serach"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                placeholder="search product..."
              />
            </form>
          </div>
          <div className="search-btn">
            <BiSearchAlt />
          </div>
        </div>
        <ul
          className={
            isClosed ? `nav-links scale-up-hor-right active` : "nav-links"
          }
        >
          <li className="nav-link">
            {cart && cart.length > 0 ? (
              <div className="number">{cart.length}</div>
            ) : (
              ""
            )}
            <Link to="/users/cart">
              <AiOutlineShoppingCart className="icon cartIcon" />
            </Link>
            Cart
          </li>
          <li className="nav-link">
            <BiNotepad className="icon" />
            Orders
          </li>
          {user ? (
            <>
              <li className="nav-link">
                <AiOutlineUser className="icon" />
                Hello,{user.name}
              </li>

              <li
                className="nav-link btn"
                style={{
                  margin: "0rem .5rem",
                  fontSize: "20px",
                  border: "1px solid #f8f9fa"
                }}
                onClick={() => {
                  dispatch(logout())
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="nav-link">
                  <AiOutlineUser className="icon" />
                  login/register
                </li>
              </Link>
            </>
          )}
        </ul>
        <div
          className="burger"
          value={isClosed}
          onClick={() => {
            setIsClosed(!isClosed)
          }}
        >
          {isClosed ? (
            <AiOutlineClose className="icon" />
          ) : (
            <GiHamburgerMenu className="icon" />
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
