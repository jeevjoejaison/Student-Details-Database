import React, { useState } from 'react';
import './createFaculty.css';

function FacultyAccount() {
    const [email, setEmail] = useState('');
    const [file, setFile] = useState(null);

    // Handle email change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle form submission for creating a faculty account
    const handleCreateAccount = () => {
        if (!email) {
            alert('Please enter a faculty email ID.');
        } else {
            console.log('Creating account for faculty email:', email);
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
            <h2><i className="fas fa-user-plus"></i> Faculty Account</h2>

            {/* Faculty Email Input */}
            <div className="form-group">
                <label htmlFor="faculty-email">Faculty Email ID</label>
                <input
                    type="email"
                    id="faculty-email"
                    placeholder="Enter faculty email ID"
                    value={email}
                    onChange={handleEmailChange}
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

export default FacultyAccount;
