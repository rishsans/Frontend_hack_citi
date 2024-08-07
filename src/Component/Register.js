import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Register.css';
import Header1 from './Header1';
const RegistrationForm = () => {
    const [form, setForm] = useState({
        UpiId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // Add form submission logic here (e.g., send data to backend)

        fetch('https://neueda-hackathon-project.onrender.com/user/create',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "first_name": form.firstName,
                "last_name": form.lastName,
                "email": form.email,
                "upi_id": form.UpiId,
                "password": form.password
              })
        })
        .then(response => {
            console.log(response)
            return response.json()
        })  // Parse the JSON in the response
        .then(data => {
            console.log(data);
            if(data===true){
                alert("Created sucessfully")
                navigate('/login'); // Navigate to create-friend-circle page
            }
            else{
                alert("Error with data")
            }
            
        
        })


        // Navigate to create-friend-circle page after successful registration
        
    };

    return (
        <div>
            <Header1 />
            <div className="registration-container">
                <form onSubmit={handleSubmit} className="registration-form">
                    <h2>Create Account</h2>
                    <div className="form-group">
                        <label>UPI Id:</label>
                        <input
                            type="text"
                            name="UpiId"
                            value={form.UpiId}
                            onChange={handleChange}
                            placeholder="Enter UPI Id"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
