import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Pages from "./pages/Pages"

const App = () => {
  return (
    <>
      <Router>
        <div className="container">
          <Pages />
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
