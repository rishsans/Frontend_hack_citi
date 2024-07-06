import React, { useState } from 'react';
import './AddExpense.css'; // Import your CSS file here
import Header from './Header';

const AddExpenseForm = () => {
    const [form, setForm] = useState({
        description: '',
        category: '',
        price: '',
        paidBy: '',
        equally: false,
        unequally: false,
        unequallyAmount: '',
        unequallyAmounts: [], // Array to store name and amount objects
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setForm(prevForm => ({
                ...prevForm,
                [name]: checked,
                unequallyAmounts: [] // Reset unequally amounts array when unequally checkbox is unchecked
            }));
        } else if (name === 'unequallyAmount') {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    const handleUnequallyAmountUpdate = () => {
        // Check if unequallyAmount is not empty
        if (form.unequallyAmount.trim() !== '') {
            // Split value into name and amount
            const [name, amount] = form.unequallyAmount.split(':');
            // Add new name and amount object to array
            setForm(prevForm => ({
                ...prevForm,
                unequallyAmounts: [...prevForm.unequallyAmounts, { name, amount }],
                unequallyAmount: '' // Clear unequallyAmount field after adding to array
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contributions = form.unequallyAmounts.reduce((acc, item) => {
            acc[item.name] = Number(item.amount);
            return acc;
        }, {});

        // Get selectedfc from sessionStorage
        const group_id = sessionStorage.getItem('selectedfc');
        console.log(group_id);
        const payload = {
            description: form.description,
            category: form.category,
            price: Number(form.price),
            user_id_of_payer: form.paidBy, // Assuming this is the user ID
            group_id: group_id ? Number(group_id) : 0, // Use selectedfc or default to 0 if not available
            contributions: contributions
        };

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
                        <input
                            type="text"
                            name="paidBy"
                            value={form.paidBy}
                            onChange={handleChange}
                            placeholder="Enter name of payer"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Split:</label>
                        <div className="split-options">
                            <label>
                                <input
                                    type="checkbox"
                                    name="equally"
                                    checked={form.equally}
                                    onChange={handleChange}
                                />
                                Equally
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="unequally"
                                    checked={form.unequally}
                                    onChange={handleChange}
                                />
                                Unequally
                            </label>
                        </div>
                    </div>
                    {form.unequally && (
                        <div className="form-group">
                            <label>Unequally Amount:</label>
                            <input
                                type="text"
                                name="unequallyAmount"
                                value={form.unequallyAmount}
                                onChange={handleChange}
                                placeholder="Enter name:amount"
                            />
                            <button
                                className='add-button'
                                type="button"
                                onClick={handleUnequallyAmountUpdate}
                                disabled={form.unequallyAmount.trim() === ''}
                            >
                                Add
                            </button>
                        </div>
                    )}
                    {/* Display unequally amounts as list */}
                    {form.unequallyAmounts.length > 0 && (
                        <div className="unequally-amounts">
                            <h3>Unequally Amounts:</h3>
                            <ul>
                                {form.unequallyAmounts.map((item, index) => (
                                    <li key={index}>{item.name}: {item.amount}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpenseForm;