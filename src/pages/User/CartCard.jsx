import { BsCurrencyRupee } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { deleteCartProduct } from "../../features/Users/userSlice"

const CartCard = ({ product }) => {
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
      <div className="placrOrderBtn">
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
