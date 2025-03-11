import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import '../StudentDashboard.css'; // Custom CSS for additional styling
import { useLocation, useNavigate } from 'react-router-dom';


const MainComponent = () => {

    const location = useLocation();
    const navigate = useNavigate();


    const handleAddClick = (formType) => {
        switch (formType) {
            case 'Add Cultural Event':
                navigate('/student-dashboard/cultural-event-form');
                break;
            case 'Add Technical Event':
                navigate('/student-dashboard/technical-event-form');
                break;
            case 'Add Sports Event':
                navigate('/student-dashboard/sports-event-form');
                break;
            case 'Add Internship':
                navigate('/student-dashboard/internship-form');
                break;
            case 'Add Placement':
                navigate('/student-dashboard/placement-form');
                break;
            case 'Add Society/Clubs':
                navigate('/student-dashboard/society-clubs-form');
                break;
            case 'Add Research Paper':
                navigate('/student-dashboard/research-paper-form');
                break;
            default:
                break;
        }
    };
  return (
    <div>
        {/* Main Content */}
        <div className="main-content p-3">
                <div className="dashboard row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 mb-4">
                    {[
                        { title: 'Add Cultural Event', icon: faPlus },
                        { title: 'Add Technical Event', icon: faPlus },
                        { title: 'Add Sports Event', icon: faPlus },
                        { title: 'Add Internship', icon: faPlus },
                        { title: 'Add Placement', icon: faPlus },
                        { title: 'Add Society/Clubs', icon: faPlus },
                        { title: 'Add Research Paper', icon: faPlus },
                    ].map((item, index) => (
                        <div key={index} className="col">
                            <div className="card h-100 text-center p-3">
                                <h3 className="card-title">
                                    <FontAwesomeIcon icon={item.icon} /> {item.title}
                                </h3>
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={() => handleAddClick(item.title)}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
    </div>
  )
}

export default MainComponent