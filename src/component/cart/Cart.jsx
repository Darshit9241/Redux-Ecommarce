import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineClose } from "react-icons/md";
import { removeItem, incrementQuantity, decrementQuantity, clearCart } from '../../redux/cartSlice';
import { useNavigate } from "react-router-dom";

const Cart = ({ isOpen, closeSidebar }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (index) => {
    dispatch(incrementQuantity({ index }));
  };

  const handleDecrement = (index) => {
    dispatch(decrementQuantity({ index }));
  };

  const handleRemoveItem = (index) => {
    dispatch(removeItem({ index }));
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };

  const handleNavigateToOrderInfo = () => {
    navigate('/order-information');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-full md:w-[450px] flex flex-col`}
    >
      <div className="flex justify-between p-5">
        <h1 className="font-bold text-xl">Cart</h1>
        <button onClick={closeSidebar} className="text-black">
          <MdOutlineClose className="size-6 text-[#FF7004]" />
        </button>
      </div>

      <div className="p-3 flex justify-between">
        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500 transition"
        >
          Clear Cart
        </button>
      </div>
      <hr />

      <div className="flex-grow overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between p-5">
              <div className="flex">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="w-[100px] h-[130px] mb-4"
                />
                <div className="flex flex-col ml-3">
                  <h1 className="pt-1">{item.name}</h1>
                  <h2 className="pt-1">s / purple / Metal</h2>
                  <h3 className="pt-1">
                    {(item.quantity || 1)} X{" "}
                    <span className="text-[#FF7004]">
                      ${item.price.toFixed(2)}
                    </span>
                  </h3>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(index)}
                      className="border border-gray-600 px-3 py-1 bg-slate-400 text-white rounded-lg hover:bg-slate-500 active:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity || 1}</span>
                    <button
                      onClick={() => handleIncrement(index)}
                      className="border border-gray-600 px-3 py-1 bg-slate-400 text-white rounded-lg hover:bg-slate-500 active:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-black"
              >
                <MdOutlineClose className="size-6 text-[#FF7004]" />
              </button>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="p-3 flex justify-between bg-[#FF7004] rounded-xl m-5">
          <h1 className="font-bold text-xl text-black bg-white p-2 rounded-lg">Total</h1>
          <button
            onClick={handleNavigateToOrderInfo}
            className="font-bold text-xl text-black bg-white p-2 rounded-lg"
          >
            ${calculateTotalPrice()}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
