import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../StudentDashboard.css"; // Custom CSS for additional styling

const ActivitiesList = () => {
    const navigate = useNavigate();

    // Mapping activity names to routes
    const activityRoutes = {
        "Cultural Events": "/cultural-events",
        "Technical Events": "/technical-events",
        "Internships": "/internships",
        "Placement": "/placements",
        "Societies/Clubs": "/societies-clubs",
        "Research Papers": "/research-paper-form",
        "Sports Events":"/sports-events"
    };

    return (
        <div>
            {/* Activities List */}
            <div className="activities">
                <h2 className="text-primary mb-3">
                    <i className="fas fa-list" /> My Activities
                </h2>
                <ul className="list-group">
                    {Object.keys(activityRoutes).map((activity, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {activity}
                            <button
                                className="btn btn-link"
                                onClick={() => navigate(activityRoutes[activity])}
                            >
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ActivitiesList;
