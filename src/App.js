import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignUp from "./component/signup/SignUp";
import Login from "./component/login/Login";
import ProductDetail from "./component/productdetail/ProductDetail";
import Header from "./component/header/Header";
import Product from "./component/product/Product";
import Cart from "./component/cart/Cart";
import { useSelector } from "react-redux";  
import Navbar from "./component/navbar/Navbar";
import OrderInfo from "./component/orderinfo/OrderInfo";
import PaymentPage from "./component/paymentPage/PaymentPage";
import OrederDetail from "./component/orderdetailpage/OrederDetail";
import Footer from "./component/footer/Footer";
import Banner from "./component/banner/Banner";
import Section2 from "./component/banner/Section2";
import NotFoundPage from "./component/404/NotFoundPage";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  console.log("object", isCartOpen);
  const cartItems = useSelector((state) => state.cart.items); 
  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const PrivateRoute = () => {
    const tokan = localStorage.getItem("tokan");
    return tokan ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <>
      <Header onCartClick={handleOpenCart} cartItemCount={cartItems.length} />
      <Navbar />
      <Routes>
        <Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/order-information" element={<OrderInfo />} />
        <Route
          path="/order-information/payment-page"
          element={<PaymentPage />}
        />
        <Route
          path="/order-information/payment-page/orderdetail"
          element={<OrederDetail />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path="/"
            element={
              <>
              <Banner />
              <Section2 />
                <Product onCartOpen={handleOpenCart} />
                <Cart
                  isOpen={isCartOpen}
                  closeSidebar={handleCloseCart}
                  cartItems={cartItems}
                />
              </>
            }
          />
        </Route>
        <Route
          path="/product/:productId"
          element={
            <>
              <ProductDetail
                onCartOpen={handleOpenCart}
                onCartClick={handleOpenCart}
              />
              <Cart
                isOpen={isCartOpen}
                closeSidebar={handleCloseCart}
                cartItems={cartItems}
              />
            </>
          }
        />
         <Route path="*" element={<NotFoundPage />} /> 
         <Route
            exact
            path="/product"
            element={
              <>
                <Product onCartOpen={handleOpenCart} />
                <Cart
                  isOpen={isCartOpen}
                  closeSidebar={handleCloseCart}
                  cartItems={cartItems}
                />
              </>
            }
          />
      </Routes>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}
