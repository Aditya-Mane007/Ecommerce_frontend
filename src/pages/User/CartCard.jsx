import { BsCurrencyRupee } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { deleteCartProduct } from "../../features/Users/userSlice"
import axios from "axios"

const CartCard = ({ product }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const checkout = async (amount) => {
    const {
      data: { order }
    } = await axios.post("http://localhost:5000/api/checkout", { amount })
    const {
      data: { key }
    } = await axios.get("http://localhost:5000/api/getKey")

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      cart_id: `${product._id}`,
      currency: "INR",
      name: "Ecommerc.in",
      description: `${product.description}`,
      image: `${product.image}`,
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:5000/api/veification",
      prefill: {
        name: `${user.name}`,
        email: `${user.email}`,
        contact: "9326549507"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#282c34"
      }
    }
    const razor = new window.Razorpay(options)
    razor.open()
  }
  const dispatch = useDispatch()
  return (
    <div className="card">
      <div className="image">
        <Link to={`/product/${product.productInfo.product_id}`}>
          <img
            src={product.productInfo.image && product.productInfo.image.url}
            alt={product.productInfo.name}
          />
        </Link>
      </div>
      <div className="name">{product.productInfo.name}</div>
      <div className="decription">{product.productInfo.description}</div>
      <div className="price">
        <BsCurrencyRupee />
        {product.productInfo.price}
      </div>
      <div className="quantity">Quantity: {product.quantity}</div>
      <div
        className="placrOrderBtn"
        onClick={() => {
          checkout(product.productInfo.price * product.quantity)
          // navigate(`/users/cart/${product._id}/checkout`)
        }}
      >
        <button className="btn" style={{ border: "1px solid grey" }}>
          Place Order
        </button>
      </div>
      <div
        className="removeBtn"
        onClick={() => {
          dispatch(deleteCartProduct(product && product._id))
        }}
      >
        <button className="btn" style={{ backgroundColor: "#ef233c" }}>
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartCard
