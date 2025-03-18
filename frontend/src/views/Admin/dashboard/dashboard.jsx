import React, { useState } from 'react';
import './dashboard.css';  // Import the CSS file for styling

function AdminDashboard() {
  // State to manage the list of categories
  const [categories, setCategories] = useState(['Dance', 'Music', 'Drama']);
  
  // State to manage the value of the dropdown
  const [dropdownValue, setDropdownValue] = useState('Cultural events');

  // Function to add a new category
  const addCategory = () => {
    setCategories([...categories, 'New Category']);
  };

  // Function to remove a category
  const removeCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  // Function to handle dropdown change
  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  return (
    <div>
      {/* Button Container: Buttons displayed on the dashboard */}
      <div className="button-container">
        <button className="button">Create Student Account</button>
        <button className="button">Create Faculty Account</button>
        <button className="button">Manage Students</button>
        <button className="button">Manage Faculties</button>
        <button className="button">Download students details as excel</button>
        <button className="button">Download faculties details as excel</button>
      </div>

      {/* Content Box: Section with dropdown and categories */}
      <div className="content-box">
        <h3>Edit form dropdowns</h3>
        <div className="dropdown-container">
          {/* Dropdown for cultural events */}
          <select id="dropdown" value={dropdownValue} onChange={handleDropdownChange}>
            <option value="Cultural events">Cultural events</option>
          </select>
          <button className="button">Fetch dropdowns</button>
        </div>

        <h3>Select Category</h3>
        <div className="category-list">
          {/* Mapping over categories and displaying each one with a remove button */}
          {categories.map((category, index) => (
            <div key={index} className="category">
              {category}
              {/* Remove button to delete a category */}
              <button className="remove-btn" onClick={() => removeCategory(category)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <br />
        {/* Add button to add a new category */}
        <button className="button" onClick={addCategory}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
