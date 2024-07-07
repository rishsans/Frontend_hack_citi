// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = () => {
    return (
        <div className="navbar">
            <h1 className="navbar-title">$plit $mart</h1>
            
            <div className="navbar-links">

                <Link to="/home" className="navbar-link">
                    <button className="navbar-button">Home</button>
                </Link>
                <Link to="/friendcirclepage" className="navbar-link">
                    <button className="navbar-button">Create Friend Circle</button>
                </Link>
                <Link to="/displayfriendlist" className="navbar-link">
                    <button className="navbar-button">Display List</button>
                </Link>
                <Link to="/friendcirclename" className="navbar-link"><button className="navbar-button">Friend Circle Name</button></Link>
                <p></p>
            </div>
        </div>
    );
};

export default Header;
//header.js