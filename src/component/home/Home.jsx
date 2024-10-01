import React, { useState } from "react";
import Header from "../header/Header";
import Product from "../product/Product";
import Cart from "../cart/Cart";
import { useSelector } from 'react-redux'; // Import useSelector to get cart items

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items); // Use useSelector to get cart items from Redux state

  const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  return (
    <>
      <Header
        onCartClick={handleOpenCart}
        cartItemCount={cartItems.length}
      />
      <Product onCartOpen={handleOpenCart} />
      <Cart
        isOpen={isCartOpen}
        closeSidebar={handleCloseCart}
        cartItems={cartItems}
      />
    </>
  );
}
