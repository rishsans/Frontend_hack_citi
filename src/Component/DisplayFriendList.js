// import React from 'react';
// import { Link } from 'react-router-dom';
// import Header from './Header';
// const DisplayFriendList = () => {

//     const handleLeaveClick = () => {
//         // Handle leave logic here
//         console.log('Leave button clicked');
//     };

//     const handleDeleteClick = () => {
//         // Handle delete logic here
//         console.log('Delete button clicked');
//     };

//     return (
//         <div>
//             <Header />

//             <div >
//                 <h2>Display List</h2>
//                 <div >
//                     <Link to="/friendcirclename" >Friend Circle Name</Link>
//                     <Link to="/addmember" >Add Friend</Link>
//                     <Link to="/addexpense" >Add Expense</Link>
//                     <button onClick={handleLeaveClick}>Leave</button>
//                     <button onClick={handleDeleteClick}>Delete</button>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default DisplayFriendList;


// 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './DisplayFriendList.css';

const DisplayFriendList = () => {

    const [FriendCricleData, setFriendCricleData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {


        fetch('https://neueda-hackathon-project.onrender.com/friend_circle/list-friend-circle-of-user/'+sessionStorage.getItem('userid'),{
            method:'GET',
        })
        .then(response => {
            console.log(response)
            return response.json()
        })  // Parse the JSON in the response
        .then(data => {
            setFriendCricleData(data)
        })
        .catch(error=>{console.error(error);})

      
    }, []);
  
    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      sessionStorage.setItem("selectedfc",selectedOption)
    };



    const handleLeaveClick = () => {
        console.log('Leave button clicked');
    };

    const handleDeleteClick = () => {
        console.log('Delete button clicked');
    };

    return (
        <div className="container">
            <Header className="header" />
            <div>
                <h2>Display List</h2>
                <div className="buttons-container">
                    <select value={selectedOption} onChange={handleChange}>
                        <option value="" disabled>Select FriendCricle</option>
                        {FriendCricleData.map(option => (
                            <option key={option.friend_circle_id} value={option.friend_circle_id}>
            {option.circle_name}</option>
                        ))}
                    </select>
                    <Link to="/friendcirclename" className="link-button">Friend Circle Name</Link>
                    <Link to="/addmember" className="link-button">Add Friend</Link>
                    <Link to="/addexpense" className="link-button">Add Expense</Link>
                    <Link to="#" onClick={handleLeaveClick} className="link-button">Leave</Link>
                    <Link to="#" onClick={handleDeleteClick} className="link-button">Delete</Link>
                    {/* <button onClick={handleLeaveClick} className="link-button">Leave</button>
                    <button onClick={handleDeleteClick} className="link-button">Delete</button> */}
                </div>
            </div>
        </div>
    );
};

export default DisplayFriendList;
