import React, {
    useState,
    useEffect
} from 'react';
import './AddExpense.css'; // Import your CSS file here
import Header from './Header';


const AddExpenseForm = (props) => {
        const circleId = sessionStorage.getItem('selectedfc');
        // Access the passed data
        const [form, setForm] = useState({
            description: '',
            category: '',
            price: '',
            paidBy: '',
            splitOption: '', // New property for radio buttons
            equallyContributions: {},
            unequallyContributions: {}, 
            unequallyAmounts: [],
        });

        const [users, setUsers] = useState([]);

        useEffect(() => {
            // Fetch the users when the component mounts
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`https://neueda-hackathon-project.onrender.com/user/list-members-of-circle/${circleId}`);
                    const result = await response.json();
                    setUsers(result);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
            }, [circleId]);

        const handleChange = (e) => {
            const {
                name,
                value,
                type
            } = e.target;
            if (type === 'radio') {
                setForm(prevForm => ({
                    ...prevForm,
                    splitOption: value,
                }));
                if (value === 'equally') {
                    calculateEqualContributions(form.price, users);
                }
            } else if (name.startsWith('equallyContribution-')) {
                const userId = name.split('-')[1];
                setForm(prevForm => ({
                    ...prevForm,
                    equallyContributions: {
                        ...prevForm.equallyContributions,
                        [userId]: value,
                    },
                }));
            } else if (name.startsWith('unequallyContribution-')) {
                const userId = name.split('-')[1];
                setForm(prevForm => ({
                    ...prevForm,
                    unequallyContributions: {
                        ...prevForm.unequallyContributions,
                        [userId]: value,
                    },
                }));
            } else {
                setForm(prevForm => ({
                    ...prevForm,
                    [name]: value,
                }));
                if (name === 'price' && form.splitOption === 'equally') {
                    calculateEqualContributions(value, users);
                }
            }
        };

        const calculateEqualContributions = (price, users) => {
            const equalAmount = price / users.length;
            const newEquallyContributions = users.reduce((acc, user) => {
                acc[user.user_id] = equalAmount.toFixed(2); // Fix to 2 decimal places
                return acc;
            }, {});
            setForm(prevForm => ({
                ...prevForm,
                equallyContributions: newEquallyContributions,
            }));
        };

        const handleUnequallyAmountUpdate = () => {
            // Check if unequallyAmount is not empty
            if (form.unequallyAmount.trim() !== '') {
                // Split value into name and amount
                const [name, amount] = form.unequallyAmount.split(':');
                // Add new name and amount object to array
                setForm(prevForm => ({
                    ...prevForm,
                    unequallyAmounts: [...prevForm.unequallyAmounts, {
                        name,
                        amount
                    }],
                    unequallyAmount: '' // Clear unequallyAmount field after adding to array
                }));
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            let contributions = {};

            if (form.unequallyAmounts) {
                contributions = form.unequallyAmounts.reduce((acc, item) => {
                    acc[item.name] = Number(item.amount);
                    return acc;
                }, {});
            }

            // Get selectedfc from sessionStorage
            const group_id = sessionStorage.getItem('selectedfc');
            console.log(group_id);
            const payload = {
                description: form.description,
                category: form.category,
                price: Number(form.price),
                user_id_of_payer: form.paidBy, // Assuming this is the user ID
                group_id: group_id ? Number(group_id) : 0, // Use selectedfc or default to 0 if not available
                contributions: {}
            };

            // Assuming form.equallyContributions or form.unequallyContributions holds the contributions
            Object.keys(form.equallyContributions).forEach(userId => {
                payload.contributions[userId] = Number(form.equallyContributions[userId]);
            });

            // Or for unequally contributions
            Object.keys(form.unequallyContributions).forEach(userId => {
                payload.contributions[userId] = Number(form.unequallyContributions[userId]);
            });

            console.log('Submitting payload:', payload);

            try {
                const response = await fetch('https://neueda-hackathon-project.onrender.com/transaction/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error response data:', errorData);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Form submitted successfully:', data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        };

    return (
        <div>
            <Header />
            <div className="add-expense-form">
                <form onSubmit={handleSubmit}>
                    <h2>Add Expense</h2>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Paid by:</label>
                        <select
                            name="paidBy"
                            value={form.paidBy}
                            onChange={handleChange}
                            required>
                            <option value="" key={0}>Select payer</option>
                            {users.map((user) => (
                                < option key = {
                                    user["user_id"]
                                }
                                value = {
                                    user["user_id"]
                                } >
                                    {
                                        user["first_name"] +" "+ user["last_name"]
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Split:</label>
                        <div className="split-options">
                            <label>
                                <input
                                    type = "radio"
                                    name = "splitOption"
                                    value = "equally"
                                    checked = { form.splitOption === 'equally' }
                                    onChange={handleChange}
                                />
                                Equally
                            </label>
                            <label>
                                <input
                                    type = "radio"
                                    name = "splitOption"
                                    value = "unequally"
                                    checked = { form.splitOption === 'unequally' }
                                    onChange = { handleChange }
                                />
                                Unequally
                            </label>
                        </div>
                    </div>
                    { (form.splitOption === 'unequally') && ( 
                        < div className = "form-group">
                            <h3> Unequally Split Contributions </h3>
                            {   users.map((user) => ( <
                                    div key = {
                                        user["user_id"]
                                    } >
                                    <label > {
                                        user.first_name + " " + user.last_name
                                    }: </label>  
                                    <input 
                                    type = "number"
                                    name = {
                                        `unequallyContribution-${user.user_id}`
                                    }
                                    value = {
                                        form.unequallyContributions[user.user_id] || ''
                                    }
                                    onChange = {
                                        handleChange
                                    }
                                    placeholder = "Enter amount"
                                    required/>
                                </div>
                            ))} 
                        </div>
                    )}
                     {
                        form.splitOption === 'equally' && 
                        (<div className="form-group">
                            <h3>Equally Split Contributions</h3>
                                {users.map((user) => (
                                    <div key={user.user_id}>
                                        <label>{user.first_name} {user.last_name}:</label>
                                        <input
                                            type="number"
                                            name={`equallyContribution-${user.user_id}`}
                                            value={form.equallyContributions[user.user_id] || ''}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            required
                                            disabled // Disable input for equally divided contributions
                                        />
                                    </div>
                                ))}
                            </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseForm;


