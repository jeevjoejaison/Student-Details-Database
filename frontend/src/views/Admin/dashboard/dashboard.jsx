import React, { useState } from 'react';
import { FaUserPlus, FaUsers, FaChalkboardTeacher, FaFileExcel, FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import './dashboard.css';  // Import the CSS file for styling

function AdminDashboard() {
  // State to manage the list of categories
  const [categories, setCategories] = useState(['Dance', 'Music', 'Drama']);

  // Function to add a new category
  const addCategory = () => {
    setCategories([...categories, 'New Category']);
  };

  // Function to remove a category
  const removeCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  return (
    <div className="dashboard-container">
      {/* Button Container: Buttons displayed on the dashboard */}
      <div className="button-container">
        <button className="button">
          <FaUserPlus className="button-icon" />
          Create Student Account
        </button>
        <button className="button">
          <FaUserPlus className="button-icon" />
          Create Faculty Account
        </button>
        <button className="button">
          <FaUsers className="button-icon" />
          Manage Students
        </button>
        <button className="button">
          <FaChalkboardTeacher className="button-icon" />
          Manage Faculties
        </button>
        <button className="button">
          <FaFileExcel className="button-icon" />
          Download Students Excel
        </button>
        <button className="button">
          <FaFileExcel className="button-icon" />
          Download Faculties Excel
        </button>
      </div>

      {/* Content Management Section */}
      <div className="content-management">
        <h3>Content Management</h3>
        <div className="edit-dropdowns">
          <h4>Edit Form Dropdowns</h4>
          <div className="dropdown-container">
            <select>
              <option>Cultural events</option>
            </select>
            <button className="button">
              <FaEdit className="button-icon" />
              Fetch dropdowns
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories">
        <h3>Categories</h3>
        <div className="category-list">
          {categories.map((category, index) => (
            <div key={index} className="category">
              {category}
              <button className="remove-btn" onClick={() => removeCategory(category)}>
                <FaTrash className="remove-icon" />
              </button>
            </div>
          ))}
        </div>
        <button className="button add-category-btn" onClick={addCategory}>
          <FaPlus className="button-icon" />
          Add new category
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;