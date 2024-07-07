import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header1 from './Header1';

const Home = () => {
    return (
        <div>
            <Header1 />
            <div className="home-container">
                <h1 className="app-name">$plit $mart</h1>
                {/* <h2 className="app-name">Equity in every expense</h2> */}
                <p className="app-description">
                    Simplify Splitting Expenses with Friends
                </p>
                <div className="features">
                    <h2>Key Features:</h2>
                    <ul>
                        <li>Create Friend Circles: Easily set up groups for managing expenses with friends.</li>
                        <li>Add Expenses: Record and split costs within your circles.</li>
                        <li>Stay Organized: Track balances and settle debts seamlessly.</li>
                    </ul>
                </div>
                <div className="action-buttons">
                    <p>Start managing your finances with friends today.</p>
                    <div className="button-container">
                        <Link to="/login" className="button">Login</Link>
                        <Link to="/register" className="button">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
