import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./layout/Header"
import Footer from "./layout/Footer"
import ProductForm from "./layout/pages/productform"
import ProductList from "./layout/pages/productList"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route path="/" element={<ProductForm />} />
        <Route path="/updateproduct/:productId" element={<ProductForm />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/product-list" element={<ProductList />} />

      </Routes>
      <ToastContainer />

      <Footer />

    </BrowserRouter>
  )
}

export default App