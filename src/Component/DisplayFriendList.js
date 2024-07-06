// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// import './DisplayFriendList.css';

// const DisplayFriendList = () => {
//     const [FriendCricleData, setFriendCricleData] = useState([]);
//     const [selectedOption, setSelectedOption] = useState('');

//     useEffect(() => {
//         fetch('https://neueda-hackathon-project.onrender.com/friend_circle/list-friend-circle-of-user/' + sessionStorage.getItem('userid'), {
//             method: 'GET',
//         })
//         .then(response => response.json())
//         .then(data => {
//             setFriendCricleData(data);
//         });
//     }, []);

//     const handleChange = (event) => {
//         setSelectedOption(event.target.value);
//         sessionStorage.setItem("selectedfc", event.target.value);
//     };

//     const handleLeaveClick = () => {
//         console.log('Leave button clicked');
//     };

//     const handleDeleteClick = () => {
//         console.log('Delete button clicked');
//     };

//     return (
//         <div className="container">
//             <Header className="header" />
//             <div>
//                 <h2>Display List</h2>
//                 <div className="buttons-container">
//                     <select value={selectedOption} onChange={handleChange}>
//                         <option value="" disabled>Select FriendCricle</option>
//                         {FriendCricleData.map(option => (
//                             <option key={option.friend_circle_id} value={option.friend_circle_id}>
//                                 {option.circle_name}
//                             </option>
//                         ))}
//                     </select>
//                     <Link to="/addmember" className="link-button">Add Friend</Link>
//                     <Link to="/addexpense" className="link-button">Add Expense</Link>
//                     <Link to="/memberlist" className="link-button">Member List</Link>
//                     <Link to="#" onClick={handleLeaveClick} className="link-button">Leave</Link>
//                     <Link to="#" onClick={handleDeleteClick} className="link-button">Delete</Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DisplayFriendList;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './DisplayFriendList.css';

const DisplayFriendList = () => {
    const [FriendCricleData, setFriendCricleData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://neueda-hackathon-project.onrender.com/friend_circle/list-friend-circle-of-user/' + sessionStorage.getItem('userid'), {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setFriendCricleData(data);
        });
    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        sessionStorage.setItem("selectedfc", event.target.value);
    };

    const handleLeaveClick = () => {
        const userId = sessionStorage.getItem('userid');
        const groupId = sessionStorage.getItem('selectedfc');

        fetch('https://neueda-hackathon-project.onrender.com/friend_circle/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: userId,
                groupID: groupId
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage('You have successfully left the group.');
            setFriendCricleData(FriendCricleData.filter(circle => circle.friend_circle_id !== parseInt(groupId)));
            setSelectedOption('');
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred while trying to leave the group.');
        });
    };

    const handleDeleteClick = () => {
        const groupId = sessionStorage.getItem('selectedfc');

        fetch('https://neueda-hackathon-project.onrender.com/friend_circle/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupID: groupId
            })
        })
        .then(response => response.json())
        .then(data => {
            setMessage('Group has been deleted.');
            setFriendCricleData(FriendCricleData.filter(circle => circle.friend_circle_id !== parseInt(groupId)));
            setSelectedOption('');
        })
        .catch(error => {
            console.error('Error:', error);
            setMessage('An error occurred while trying to delete the group.');
        });
    };

    return (
        <div className="container">
            <Header className="header" />
            <div>
                <h2>Display List</h2>
                {message && <div className="message">{message}</div>}
                <div className="buttons-container">
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="" disabled>Select FriendCricle</option>
                        {FriendCricleData.map(option => (
                            <option key={option.friend_circle_id} value={option.friend_circle_id}>
                                {option.circle_name}
                            </option>
                        ))}
                    </select>
                    <Link to="/addmember" className="link-button">Add Friend</Link>
                    <Link to="/addexpense" className="link-button">Add Expense</Link>
                    <Link to="/memberlist" className="link-button">Member List</Link>
                    <Link to="#" onClick={handleLeaveClick} className="link-button">Leave</Link>
                    <Link to="#" onClick={handleDeleteClick} className="link-button">Delete</Link>
                </div>
            </div>
        </div>
    );
};

export default DisplayFriendList;
