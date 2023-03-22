import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineClose
} from "react-icons/ai"
import { BiNotepad, BiSearchAlt } from "react-icons/bi"
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import { useSelector } from "react-redux"
import "../CSS/Navbar.css"

const Navbar = () => {
  const [isClosed, setIsClosed] = useState(true)
  const { user } = useSelector((state) => state.user)
  const [search, setSearch] = useState("")

  const submitHandler = () => {}
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
            <AiOutlineShoppingCart className="icon" />
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
