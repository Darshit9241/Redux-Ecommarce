import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderDetailsPage = () => {
  const location = useLocation();
  const { name, city, state, pincode,shippingAddress } = location.state || {};

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cartItemCount = cartItems.length;
  const navigate = useNavigate();

  // Generate a random order number
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  };

  // Get the current date
  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Details</h1>

        {/* Order Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Order Number:</span>
              <span className="text-gray-900 font-bold">{generateOrderNumber()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Order Date:</span>
              <span className="text-gray-900 font-bold">{getCurrentDate()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Name:</span>
              <span className="text-gray-900 font-bold">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">City:</span>
              <span className="text-gray-900 font-bold">{city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">State:</span>
              <span className="text-gray-900 font-bold">{state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Pincode:</span>
              <span className="text-gray-900 font-bold">{pincode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Shipping Address:</span>
              <span className="text-gray-900 font-bold">{shippingAddress}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h2>
          <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-gray-200 border-b border-gray-300 p-4 flex justify-between text-gray-700 font-medium">
              <span>Product</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            <div className="p-4 flex justify-between border-b border-gray-300">
              <span className="text-gray-800">Darshit</span>
              <span className="text-gray-600">{cartItemCount}</span>
              <span className="text-gray-600">${totalPrice}</span>
            </div>
            <div className="p-4 flex justify-between text-gray-900 font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-8">
          <button
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={() => alert('Reorder functionality')}
          >
            Reorder
          </button>
          <button
            className="bg-gray-600 text-white font-medium py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300"
            onClick={() => navigate("/")}
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
