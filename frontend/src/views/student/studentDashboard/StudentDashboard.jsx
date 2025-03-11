import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudentDashboard.css'; // Custom CSS for additional styling
import Header from './components/Header.jsx';
import MainComponent from './components/MainComponent.jsx';
import ActivitiesList from './components/ActivitiesList.jsx';

const StudentDashboard = () => {
    return (
        <div className="container-fluid student-dashboard vh-100 vw-100 p-0">
            
          <Header/>
          <MainComponent/>
          <ActivitiesList/>
        </div>
 
    );
};

export default StudentDashboard;