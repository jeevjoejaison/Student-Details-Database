import React, { useState } from 'react';
import "./manageFaculty.css"

const FaDepartmentForm = () => {
  const [department, setDepartment] = useState('');
  const [users, setUsers] = useState([
    { name: 'Chrisz Charls', userId: 'chrisz.b220244cs' },
    { name: 'Sreehari S', userId: 'sreehari.b220546cs' },
    { name: 'Jeev Joe Jaison', userId: 'jeev.b220356cs' },
  ]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleGetResult = () => {
    // Logic to filter users based on selected department can be added here.
    console.log(`Fetching result for department: ${department}`);
  };

  const handleBack = () => {
    // Logic for "Back" action can be added here, such as navigating back.
    console.log('Going back');
  };

  return (
    <div className="container">
      <h2><i className="fas fa-building"></i> Department</h2>

      {/* Department Dropdown */}
      <div className="form-group">
        <label htmlFor="department">Select Department</label>
        <select
          id="department"
          value={department}
          onChange={handleDepartmentChange}
        >
          <option value="CS">Computer Science</option>
          <option value="EE">Electrical Engineering</option>
          <option value="ME">Mechanical Engineering</option>
          <option value="CE">Civil Engineering</option>
        </select>
      </div>

      {/* Get Result Button */}
      <div className="button-group">
        <button className="get-result" onClick={handleGetResult}>
          Get Result
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.userId}</td>
              <td>
                <a href="#" className="edit-link">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Back Button */}
      <div className="buttons">
        <button className="back" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
};

export default FaDepartmentForm;
