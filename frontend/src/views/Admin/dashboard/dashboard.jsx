import React from 'react';
import './dashboard.css';

function Dashboard() {
  return (
    <div className="App">
      <ButtonContainer />
      <ContentBox />
    </div>
  );
}

const ButtonContainer = () => {
  const buttons = [
    { label: "Create Student Account", icon: "fas fa-user-plus" },
    { label: "Create Faculty Account", icon: "fas fa-chalkboard-teacher" },
    { label: "Manage Students", icon: "fas fa-users-cog" },
    { label: "Manage Faculties", icon: "fas fa-user-tie" },
    { label: "Download students details as excel", icon: "fas fa-file-excel" },
    { label: "Download faculties details as excel", icon: "fas fa-file-excel" },
  ];

  return (
    <div className="button-container">
      {buttons.map((button, index) => (
        <button key={index} className="button">
          <i className={button.icon}></i> {button.label}
        </button>
      ))}
    </div>
  );
};

const ContentBox = () => {
  const categories = ["Dance", "Music", "Drama"];

  return (
    <div className="content-box">
      <h3>Edit form dropdowns</h3>
      <div className="dropdown-container">
        <select id="dropdown">
          <option value="Cultural events">Cultural events</option>
        </select>
        <button className="button">
          <i className="fas fa-sync-alt"></i> Fetch dropdowns
        </button>
      </div>

      <h3>Select Category</h3>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={index} className="category">
            {category}
            <button className="remove-btn">
              <i className="fas fa-trash-alt"></i> Remove
            </button>
          </div>
        ))}
      </div>
      <br />
      <button className="add-btn">
        <i className="fas fa-plus"></i> Add
      </button>
    </div>
  );
};