import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../redux/cartSlice'; 
import { useNavigate } from 'react-router-dom';

const OrderInfo = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRemoveItem = (index) => {
        dispatch(removeItem({ index }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleNavigateToPaymentPage = () => {
        if (cartItems.length > 0) {
            navigate('/order-information/payment-page');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-300">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Cart Information</h1>
            <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-0 border border-gray-300">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="border-b border-gray-300 p-4 text-left">Product Image</th>
                            <th className="border-b border-gray-300 p-4 text-left">Product Name</th>
                            <th className="border-b border-gray-300 p-4 text-left">Unit Price</th>
                            <th className="border-b border-gray-300 p-4 text-left">Qty</th>
                            <th className="border-b border-gray-300 p-4 text-left">Subtotal</th>
                            <th className="border-b border-gray-300 p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={index} className="even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                                    <td className="border-b border-gray-300 p-4">
                                        <img
                                            src={item.imgSrc}
                                            alt={item.name}
                                            className="w-[90px] h-[90px] mx-auto"
                                        />
                                    </td>
                                    <td className="border-b border-gray-300 p-4">{item.name}</td>
                                    <td className="border-b border-gray-300 p-4 text-right">${item.price.toFixed(2)}</td>
                                    <td className="border-b border-gray-300 p-4 text-center">{item.quantity}</td>
                                    <td className="border-b border-gray-300 p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td className="border-b border-gray-300 p-4 text-center">
                                        <button
                                            onClick={() => handleRemoveItem(index)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border-b border-gray-300 p-4 text-center text-gray-600">Your cart is empty.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button
                    onClick={handleClearCart}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                    Clear Cart
                </button>
                <div className="text-2xl font-bold text-gray-900">
                    Total: ${totalPrice.toFixed(2)}
                </div>
                <button
                    className={`bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 ${cartItems.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={handleNavigateToPaymentPage}
                    disabled={cartItems.length === 0}
                >
                    Process to Pay
                </button>
            </div>
        </div>
    );
};

export default OrderInfo;
