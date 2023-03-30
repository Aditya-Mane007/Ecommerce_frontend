import React, { useEffect, useState } from "react"
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { BiNotepad } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { logout } from "../../features/Sellers/sellerSlice"

const SellerNavbar = () => {
  const [isClosed, setIsClosed] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { seller, isSuccess, isError, message } = useSelector(
    (state) => state.seller
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (!seller) {
      navigate("/seller/login")
    }
  }, [seller, isSuccess, isError, message, navigate, dispatch])
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/seller/home">Ecommerce Seller</Link>
      </div>
      <ul
        className={
          isClosed ? `nav-links scale-up-hor-right active` : "nav-links"
        }
      >
        {seller ? (
          <>
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
            <li
              className="nav-link btn"
              style={{
                margin: "0rem .5rem",
                fontSize: "20px",
                border: "1px solid #f8f9fa"
              }}
            >
              <Link to="/seller/home/add">Add Product</Link>
            </li>
            <li
              className="nav-link"
              style={{ margin: "0rem .5rem", fontSize: "20px", border: "none" }}
            >
              <BiNotepad
                className="icon"
                style={{
                  margin: "0rem .5rem",
                  fontSize: "20px",
                  alignItems: "center"
                }}
              />
              Orders
            </li>
            <li
              className="nav-link"
              style={{ margin: "0rem .5rem", fontSize: "20px", border: "none" }}
            >
              <AiOutlineUser
                className="icon"
                style={{
                  margin: "0rem .5rem",
                  fontSize: "20px",
                  alignItems: "center"
                }}
              />
              Hello,{seller.name}
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
  )
}

export default SellerNavbar
