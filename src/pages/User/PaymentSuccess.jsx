import React from "react"
import { useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0]

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      Payment Successfull : {searchQuery.get("refercence")}
    </div>
  )
}

export default PaymentSuccess
