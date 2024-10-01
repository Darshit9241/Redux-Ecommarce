import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    city: '',
    state: '',
    pincode: '',
    shippingAddress: ''
  });
  const [errors, setErrors] = useState({});
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const navigate = useNavigate();

  const handlePaymentMethodChange = (method) => setPaymentMethod(method);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!userInfo.name) newErrors.name = 'Name is required';
    if (!userInfo.city) newErrors.city = 'City is required';
    if (!userInfo.state) newErrors.state = 'State is required';
    if (!userInfo.pincode) newErrors.pincode = 'Pincode is required';
    if (!userInfo.shippingAddress) newErrors.shippingAddress = 'Shipping Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validateFields()) return;

    setIsPlacingOrder(true);

    setTimeout(() => {
      navigate('/order-information/payment-page/orderdetail', {
        state: userInfo,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Payment Details</h1>

        {/* Personal Information Fields */}
        <div className="mb-8 space-y-6">
          {['name', 'city', 'state', 'pincode', 'shippingAddress'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-gray-700 font-semibold">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={userInfo[field]}
                onChange={handleInputChange}
                placeholder={`Enter your ${field}`}
                className={`w-full px-4 py-3 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
                required
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Payment Method Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Payment Method</h2>
          <div className="flex flex-col space-y-3">
            {['credit-card', 'google-pay', 'paypal', 'cod'].map((method) => (
              <label key={method} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => handlePaymentMethodChange(method)}
                  className="mr-3 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-400"
                />
                <span className="text-gray-700">
                  {method === 'credit-card' ? 'Credit/Debit Card' : method === 'google-pay' ? 'Google Pay' : method === 'cod' ? 'Cash on Delivery (COD)' : 'PayPal'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        {paymentMethod === 'credit-card' && (
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="block text-gray-700 font-semibold">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="block text-gray-700 font-semibold">Expiration Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="cvv" className="block text-gray-700 font-semibold">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  required
                />
              </div>
            </div>
          </form>
        )}

        {/* Order Summary */}
        <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <div className="mt-3 flex justify-between text-gray-700">
            <span>Items Total:</span>
            <span>$99.99</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div className="mt-3 flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300 mt-8 flex justify-center items-center ${isPlacingOrder ? 'animate-pulse' : ''}`}
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? (
            <span className="flex items-center">
              <FaCheckCircle className="text-white text-xl mr-2" />
              Placing Order...
            </span>
          ) : paymentMethod === 'cod' ? (
            'Place Order'
          ) : (
            'Proceed to Payment'
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
