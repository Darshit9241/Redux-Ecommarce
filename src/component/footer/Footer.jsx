import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {/* Footer Section 1 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>

          {/* Footer Section 2 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Help</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Returns</a></li>
            </ul>
          </div>

          {/* Footer Section 3 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Services</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-white">Corporate Sales</a></li>
              <li><a href="#" className="hover:text-white">Student Discounts</a></li>
            </ul>
          </div>

          {/* Footer Section 4 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Social</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>

          {/* Footer Section 5 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Legal</h3>
            <ul>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kakadiya InfoTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
