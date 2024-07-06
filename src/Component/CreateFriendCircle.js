// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import './CreateFriendCircle.css'; // Import your CSS file here
// import Header from './Header';

// const FriendCirclePage = () => {
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const [form, setForm] = useState({
//         circleId: '',
//         circleName: '',
//         category: '', // This will hold the selected category ('home', 'trip', 'office')
//         date: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };

//     const handleCategoryChange = (e) => {
//         const { value } = e.target;
//         setForm({
//             ...form,
//             category: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', form);
//         // Add logic to handle form submission (e.g., API call, state update)

//         // Navigate to display friend circle list page after form submission
//         navigate('/displayfriendlist');
//     };

//     return (
//         <div>
//             <Header />
//             <div className="friend-circle-container">

//                 <h2>Create Friend Circle</h2>
//                 <form onSubmit={handleSubmit} className="friend-circle-form">
//                     <div className="form-group">
//                         <label htmlFor="circleId">ID:</label>
//                         <input
//                             type="text"
//                             id="circleId"
//                             name="circleId"
//                             value={form.circleId}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="circleName">Friend Circle Name:</label>
//                         <input
//                             type="text"
//                             id="circleName"
//                             name="circleName"
//                             value={form.circleName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Category:</label>
//                         <div className="category-options">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="home"
//                                     checked={form.category === 'home'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Home
//                             </label>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="trip"
//                                     checked={form.category === 'trip'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Trip
//                             </label>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="office"
//                                     checked={form.category === 'office'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Office
//                             </label>
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="date">Date:</label>
//                         <input
//                             type="date"
//                             id="date"
//                             name="date"
//                             value={form.date}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FriendCirclePage;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CreateFriendCircle.css';
// import Header from './Header';
// import { FriendCircleContext } from './FriendCircleContext';

// const FriendCirclePage = () => {
//     const navigate = useNavigate();
//     const { setFriendCircle } = useContext(FriendCircleContext);

//     const [form, setForm] = useState({
//         circleId: '',
//         circleName: '',
//         category: '',
//         date: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm({
//             ...form,
//             [name]: value,
//         });
//     };

//     const handleCategoryChange = (e) => {
//         const { value } = e.target;
//         setForm({
//             ...form,
//             category: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form submitted:', form);
//         setFriendCircle(form); // Set the form data in context
//         navigate('/displayfriendlist');
//     };

//     return (
//         <div>
//             <Header />
//             <div className="friend-circle-container">
//                 <h2>Create Friend Circle</h2>
//                 <form onSubmit={handleSubmit} className="friend-circle-form">
//                     <div className="form-group">
//                         <label htmlFor="circleId">ID:</label>
//                         <input
//                             type="text"
//                             id="circleId"
//                             name="circleId"
//                             value={form.circleId}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="circleName">Friend Circle Name:</label>
//                         <input
//                             type="text"
//                             id="circleName"
//                             name="circleName"
//                             value={form.circleName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Category:</label>
//                         <div className="category-options">
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="home"
//                                     checked={form.category === 'home'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Home
//                             </label>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="trip"
//                                     checked={form.category === 'trip'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Trip
//                             </label>
//                             <label>
//                                 <input
//                                     type="checkbox"
//                                     name="category"
//                                     value="office"
//                                     checked={form.category === 'office'}
//                                     onChange={handleCategoryChange}
//                                 />
//                                 Office
//                             </label>
//                         </div>
//                     </div>
//                     {/* <div className="form-group">
//                         <label htmlFor="date">Date:</label>
//                         <input
//                             type="date"
//                             id="date"
//                             name="date"
//                             value={form.date}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </div> */}
//                     <button type="submit">Submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FriendCirclePage;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateFriendCircle.css';
import Header from './Header';
import { FriendCircleContext } from './FriendCircleContext';

const FriendCirclePage = () => {
    const navigate = useNavigate();
    const { setFriendCircle } = useContext(FriendCircleContext);

    const [form, setForm] = useState({
        circleId: '',
        circleName: '',
        category: '',
        date: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setForm({
            ...form,
            category: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        setFriendCircle(form); // Set the form data in context

        // Create the payload for the API request
        const payload = {
            admin_user_id: form.circleId,
            circle_name: form.circleName,
            circle_category: form.category,
        };

        try {
            // Update the URL to the provided endpoint
            const response = await fetch('https://neueda-hackathon-project.onrender.com/friend_circle/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to create friend circle');
            }

            const data = await response.json();
            console.log('Friend circle created successfully:', data);
            navigate('/displayfriendlist');
        } catch (error) {
            console.error('Error creating friend circle:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="friend-circle-container">
                <h2>Create Friend Circle</h2>
                <form onSubmit={handleSubmit} className="friend-circle-form">
                    <div className="form-group">
                        <label htmlFor="circleId">ID:</label>
                        <input
                            type="text"
                            id="circleId"
                            name="circleId"
                            value={form.circleId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="circleName">Friend Circle Name:</label>
                        <input
                            type="text"
                            id="circleName"
                            name="circleName"
                            value={form.circleName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <div className="category-options">
                            <label>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="home"
                                    checked={form.category === 'home'}
                                    onChange={handleCategoryChange}
                                />
                                Home
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="trip"
                                    checked={form.category === 'trip'}
                                    onChange={handleCategoryChange}
                                />
                                Trip
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="category"
                                    value="office"
                                    checked={form.category === 'office'}
                                    onChange={handleCategoryChange}
                                />
                                Office
                            </label>
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={form.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FriendCirclePage;


