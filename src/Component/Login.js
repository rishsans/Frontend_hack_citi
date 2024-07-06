import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Login.css'; // Import your CSS file
import Header1 from './Header1';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    function setuserid() {


        fetch('https://neueda-hackathon-project.onrender.com/user/email/'+sessionStorage.getItem('Email'),{
            method:'GET',
        })
        .then(response => {
            console.log(response)
            return response.json()
        })  // Parse the JSON in the response
        .then(data => {
            console.log(data)
            sessionStorage.setItem('userid',data['user_id'])
            navigate('/displayfriendlist');
        })
        
        .catch(error=>{console.error(error);})

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);




        fetch('https://neueda-hackathon-project.onrender.com/user/verify',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email,"password":password})
        })
        .then(response => {
            console.log(response)
            return response.json()
        })  // Parse the JSON in the response
        .then(data => {
            console.log(data);
            if(data===true){
                sessionStorage.setItem('Email',email)
                setuserid()
                 // Navigate to create-friend-circle page
            }
            else{
                alert("incorrect credintionals")
            }
            
        
        })
        
        .catch(error=>{console.error(error);})

        // Replace with your actual login logic
        // Example of navigating to create-friend-circle page after successful login
        // setTimeout(() => {
        //     navigate('/displayfriendlist'); // Navigate to create-friend-circle page
        // }, 1000);
    };

    return (
        <div>
            <Header1 />
            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
