import React, { useEffect, useState } from 'react';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const groupId = sessionStorage.getItem('selectedfc');
        if (groupId) {
            fetch(`https://neueda-hackathon-project.onrender.com/transaction/list/${groupId}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
        }
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                <li>
                    catergory - price -date
                </li>
                {transactions.map(transaction => (
                    <li key={transaction.transaction_id}>
                        {transaction.category} - ${transaction.price} - {transaction.payment_date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
