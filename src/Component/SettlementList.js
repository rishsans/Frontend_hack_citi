import React, { useEffect, useState } from 'react';

const SettlementList = () => {
    const [settlements, setSettlements] = useState([]);

    useEffect(() => {
        const groupId = sessionStorage.getItem('selectedfc');
        const userId = sessionStorage.getItem('userid');
        if (groupId && userId) { // http://localhost:8080
            fetch(`https://neueda-hackathon-project.onrender.com/transaction/settlement/list/${groupId}/${userId}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setSettlements(data);
            })
            .catch(error => {
                console.error('Error fetching settlements:', error);
            });
        }
    }, []);

    return (
        <div>
            <h2>Settlement List</h2>
            <ul>
                {settlements.map(settlement => (
                    <li key={settlement.settlementId}>
                        {settlement.note} - Balance: ${settlement.balance} - userID: {settlement.userId}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SettlementList;
