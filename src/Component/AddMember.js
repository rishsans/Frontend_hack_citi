import React, { useState } from 'react';
import './AddMember.css'; // Import your CSS file here
import Header from './Header';

const AddMemberForm = () => {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [upiId, setUpiId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const adminUserId = sessionStorage.getItem('userid');
        const friendCircleId = sessionStorage.getItem('selectedfc');
        
        fetch('https://neueda-hackathon-project.onrender.com/friend_circle/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                admin_user_id: adminUserId,
                friend_circle_id: friendCircleId,
                new_user_id: userId
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Form submitted:', data);
            // Handle the response data as needed
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Reset form state if needed
        setUserId('');
        setName('');
        setEmail('');
        setUpiId('');
    };

    return (
        <div>
            <Header />
            <div className="add-member-form">
                <h2>Add Member</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>User ID:</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="Enter User ID"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>UPI ID:</label>
                        <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="Enter UPI ID"
                            required
                        />
                    </div>
                    <button type="submit">Add Member</button>
                </form>
            </div>
        </div>
    );
};

export default AddMemberForm;
