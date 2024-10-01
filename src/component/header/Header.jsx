import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Header({ onCartClick }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const searchModalRef = useRef(null);
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.length;

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setIsProfileMenuOpen(false);
    }
    if (
      searchModalRef.current &&
      !searchModalRef.current.contains(event.target)
    ) {
      setIsSearchModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignInClick = () => {
    navigate('/sign-up'); 
    setIsProfileMenuOpen(false); // Close dropdown after navigating
  };

  const handleLogInClick = () => {
    navigate('/login');
    setIsProfileMenuOpen(false); // Close dropdown after navigating
  };

  const handleLogout = () => {
    localStorage.setItem("token", "")
    navigate("/login");
    setIsProfileMenuOpen(false); // Close dropdown after logging out
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white py-4 px-32 z-10 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex space-x-5 relative">
            <IoSearch className="text-2xl cursor-pointer" onClick={toggleSearchModal} />
            <div className="relative" ref={profileMenuRef}>
              <CgProfile
                className="text-2xl cursor-pointer"
                onClick={toggleProfileMenu}
              />
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-50">
                  <div
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={handleSignInClick}
                  >
                    Sign Up
                  </div>
                  <div
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={handleLogInClick}
                  >
                    Log In
                  </div>
                  <div
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log Out
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <FaShoppingBag
                className="text-2xl cursor-pointer"
                onClick={onCartClick}
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
          <div className="text-2xl font-bold text-[#FF7004]">DKCART</div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div ref={searchModalRef} className="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-xl mb-4">Search</h2>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              onClick={() => setIsSearchModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
