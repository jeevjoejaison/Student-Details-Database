import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faHome, faInfoCircle, faComments, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../StudentDashboard.css';

const Header = () => {
  return (
    <div>
        {/* Header */}
                    <div className="header d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
                        <h1 className="text-primary mb-0">
                            <FontAwesomeIcon icon={faUserGraduate} /> Student Dashboard
                        </h1>
                        <div className="nav-menu d-flex gap-2">
                            <Link to="/student-dashboard" className={`btn ${location.pathname === '/student-dashboard' ? 'btn-primary' : 'btn-outline-primary'}`}>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                            <Link to="/student-dashboard/about" className={`btn ${location.pathname === '/student-dashboard/about' ? 'btn-primary' : 'btn-outline-primary'}`}>
                                <FontAwesomeIcon icon={faInfoCircle} /> About
                            </Link>
                            <Link to="/student-dashboard/feedback" className={`btn ${location.pathname === '/student-dashboard/feedback' ? 'btn-primary' : 'btn-outline-primary'}`}>
                                <FontAwesomeIcon icon={faComments} /> Feedback
                            </Link>
                            <a href="#" className="btn btn-outline-danger">
                                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                            </a>
                        </div>
                    </div>
    </div>
  )
}

export default Header