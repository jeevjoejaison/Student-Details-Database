import React, { useState } from 'react';
import './createStudent.css';

function StudentAccount() {
    const [rollNumber, setRollNumber] = useState('');
    const [file, setFile] = useState(null);

    // Handle roll number change
    const handleRollNumberChange = (e) => {
        setRollNumber(e.target.value);
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission for creating a student account
    const handleCreateAccount = () => {
        if (!rollNumber) {
            alert('Please enter a student roll number.');
        } else {
            console.log('Creating account for roll number:', rollNumber);
            // Add your logic for creating the account
        }
    };

    // Handle creating all accounts from an Excel file
    const handleCreateAllAccounts = () => {
        if (!file) {
            alert('Please select an Excel file.');
        } else {
            console.log('Creating accounts from file:', file.name);
            // Add your logic for creating all accounts from the file
        }
    };

    return (
        <div className="container">
            <h2><i className="fas fa-user-plus"></i> Student Account</h2>

            {/* Roll Number Input */}
            <div className="form-group">
                <label htmlFor="faculty-email">Student Roll Number</label>
                <input
                    type="text"
                    id="faculty-email"
                    placeholder="Enter student roll number"
                    value={rollNumber}
                    onChange={handleRollNumberChange}
                />
            </div>

            {/* Create Account Button */}
            <div className="buttons">
                <button className="create-account" onClick={handleCreateAccount}>
                    <i className="fas fa-user-plus"></i> Create Account
                </button>
            </div>

            {/* Excel File Input */}
            <div className="form-group">
                <label htmlFor="excel-file">Select Excel File</label>
                <input
                    type="file"
                    id="excel-file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
            </div>

            {/* Create All Accounts Button */}
            <div className="buttons">
                <button className="create-all-accounts" onClick={handleCreateAllAccounts}>
                    <i className="fas fa-users"></i> Create All Accounts
                </button>
                <button className="back">
                    <i className="fas fa-arrow-left"></i> Back
                </button>
            </div>
        </div>
    );
}

export default StudentAccount;
