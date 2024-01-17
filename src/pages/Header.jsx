
// components/Navigation.js
import React from 'react';
import onlineShop from "../assets/images/onlineShop.png"
import { Link } from 'react-router-dom';
import CartIcon from '../component/CartIcon';

const Header = () => {
  return (
    <nav className="bg-[#a0bfb9] p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl" >
        <img src={onlineShop} alt="WebsiteLogo" className='w-8 h-12 md:w-16 md:h-16' />
          </Link> 
        <div className="flex items-center space-x-4">
          <div className="text-white">John Doe</div>
          <Link to="/cart">
          <div className="text-white"><CartIcon/></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
