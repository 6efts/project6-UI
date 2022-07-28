import cart from '../images/cart-gray.png';
import userIcon from '../images/user-gray.png';
import ink from '../images/ink.png';
import logoutsign from '../images/logoutsign.png';

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const getUserById = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}users/${user._id}`
      );

      if (data.error) {
        navigate('/login');
        return;
      }

      setIsLoggedIn(true);
    };

    if (user) {
      getUserById();
    }
  }, [navigate, user]);

  return (
    <div className="flex h-24 py-4 bg-transparent border-b-2 justify-evenly ">
      <div>
        <Link to="/">
          <img className="cursor-pointer" src={ink} alt="ink" />
        </Link>
      </div>
      <div>
        <ul className="list-none flex py-4 text-[#e5e5e5] text-xl cursor-pointer  ">
          <Link to="/">
            <li className="px-4 hover:text-[#ce9556] hover:border-b-2 hover:pb-2">
              Home
            </li>
          </Link>
          <li className="px-4 hover:text-[#ce9556] hover:border-b-2 hover:pb-2">
            About
          </li>
          <Link to="/gallery">
            <li className="px-4 hover:text-[#ce9556] hover:border-b-2 hover:pb-2">
              Gallery
            </li>
          </Link>
          <li className="px-4 mr-14 hover:text-[#ce9556] hover:border-b-2 hover:pb-2">
            Contact
          </li>
        </ul>
      </div>
      <div className="flex py-2 cursor-pointer">
        {!isLoggedIn && (
          <Link to="/login">
            <img className="h-8 px-4 hover:" src={userIcon} alt="user" />
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/cart">
            <img className="h-8" src={cart} alt="cart" />
          </Link>
        )}
        {isLoggedIn && (
          <button type="button" onClick={onLogout}>
            <img className="w-6 mb-4 ml-6" src={logoutsign} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
