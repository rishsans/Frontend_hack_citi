import React, { useEffect, useState } from 'react';

const MemberList = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const id = sessionStorage.getItem('selectedfc');
        fetch("https://neueda-hackathon-project.onrender.com/user/list-members-of-circle/+ sessionStorage.getItem('selectedfc')", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setMembers(data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <h2>Member List</h2>
            <ul>
                {members.map(member => (
                    <li key={member.user_id}>
                        {member.first_name} {member.last_name} - {member.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;
//MemList.js