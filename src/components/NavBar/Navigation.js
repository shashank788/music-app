import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false)
  const userName = localStorage.getItem('userName');
  useEffect(() => {
    const apiUrl = 'https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products';
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const matchingItems = filterItems(data);
        setResults(matchingItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const filterItems = (data) => {
      return data.filter((item) => {
        const itemText = item.title.toLowerCase();
        const searchText = input.toLowerCase();
        return itemText.includes(searchText);
      });
    };
    if (input.trim() !== '') {
      fetchData();
    } else {
      setResults([]);
    }
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleListItemClick = () => {
    setInput('');
  };
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const { size } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/login')
  };

  const handleMouseEnter = () => {
    setShowLogoutDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowLogoutDropdown(false);
  };

  return (
    <div className='navbar_container'>
      <div className='navbar_component'>
        <Link to="/">
          <div className='navbar_logo'></div>
        </Link>
        <div className="navbar_locator">
          <div className="navbar_locatorImage"></div>
          <div className="navbar_location">India</div>
        </div>
        <div className="navbar_searchcomponent">
          <div className='select_all'>
            <select className="nav_dropdown">
              <option value="All">All</option>
              <option value="Alexa">Alexa</option>
              <option value="Books">Books</option>
              <option value="Baby">Baby</option>
              <option value="Beauty">Beauty</option>
              <option value="Clothes">Clothes</option>
            </select>
          </div>
          <div>
            <input type="text" className="navbar_searchbox" placeholder='Search Amazon.in' value={input}
              onChange={handleInputChange} />
            <div className='navbar_search_list'>
              <ul>
                {results.length > 0 &&
                  results.slice(0, 10).map((item) => (
                    <Link to={`/order/` + item.id} key={item.id} onClick={handleListItemClick}>
                      <li key={item.id}>{item.title}</li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
          <div className="navbar_seaarchboxdiv">
            <div className="navbar_searchicon" />
          </div>
        </div>
        <div className="navbar_text navbar_signin hide_for_desktop" onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div style={{ fontSize: "14px" }}>{userName ? `Hello, ${userName}` : 'Hello, Sign In'}</div>
          <div style={{ fontWeight: "bold" }}>Account & List</div>
        </div>
        {userName && showLogoutDropdown && (
          <div className="navbar_logout_dropdown" onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className="navbar_logout_item" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
          <Link to="/login">
        {!userName && showLogoutDropdown && (
            <div className="navbar_logout_dropdown" onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <div className="navbar_logout_item" onClick={handleLogout}>
                Login
              </div>
            </div>
        )}
        </Link>
        <Link to="/order">
          <div className="navbar_text navbar_returns hide_for_desktop">
            <div style={{ fontSize: "14px" }}>Returns</div>
            <div style={{ fontWeight: "bold" }}> & Order</div>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="navbar_text navbar_cart hide_for_desktop">
            <div className="cart_image" ></div>
            <div className="cart_item">{size}</div>
            <div className="navbar_text_cart">Cart</div>
          </div>
        </Link>
        {/* for mobile */}

        <div className="hamburger-menu">
          <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
            <GiHamburgerMenu style={{ color: "white" }} />
          </a>
        </div>

        {/* <div className='hamburger_menu_mobile hide_for_mobile'> */}
        <div className={
          showMediaIcons ? 'hamburger_menu_mobile' : 'hamburger_menu hide_for_mobile'
        }>
          <Link to="/login">
            <div className='mobile_signIn'>
              <div style={{ fontSize: "14px" }}>{userName ? `Hello, ${userName}` : 'Hello, Sign In'}</div>
              <div style={{ fontWeight: "bold" }}>Account & List</div>
            </div>
          </Link>
          <Link to="/order">
            <div className='mobile_order'>
              <div style={{ fontSize: "14px" }}>Returns</div>
              <div style={{ fontWeight: "bold" }}> & Order</div>
            </div>
          </Link>
          <Link to="/checkout">
            <div className='mobile_cart'>
              <div className="cart_image" ></div>
              <div className="cart_item">{size}</div>
              <div className="navbar_text_cart">Cart</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="navbar_footer">
        <div className='navbar_footer_body'>
          <Link to='/mens'>
            <div className='navbar_footer_text'>
              men's clothing
            </div>
          </Link>
          <Link to='/electronics'>
            <div className={`navbar_footer_text`}>
              electronics
            </div>
          </Link>
          <Link to='/womens'>
            <div className={`navbar_footer_text`}>
              women's clothing
            </div>
          </Link>
          <Link to='/jewelery'>
            <div className={`navbar_footer_text`}>
              jewelery
            </div>
          </Link>
        </div>
        <Link to='/display'>
          <div className='navbar_footer_image'><img src='https://m.media-amazon.com/images/G/31/Events/img23/Aug23ART/SWM_400x39_Shop_now._CB601306814_.jpg' /></div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar;