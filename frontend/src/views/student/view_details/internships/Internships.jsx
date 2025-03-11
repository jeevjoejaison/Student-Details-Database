import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBriefcase, FaTrash, FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaUserTie } from "react-icons/fa";

const InternshipEntries = () => {
    const [internships, setInternships] = useState([]);

    // Fetch internships from API
    useEffect(() => {
        
    }, []);

    // Delete internship entry
    const handleDelete = (id) => {

    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FaBriefcase className="me-2" /> Internship Entries
                </h1>
            </div>

            <table className="table table-bordered">
                <thead className="bg-primary text-white">
                    <tr>
                        <th><FaBuilding /> Company</th>
                        <th><FaUserTie /> Role</th>
                        <th><FaCalendarAlt /> Start Date</th>
                        <th><FaCalendarAlt /> End Date</th>
                        <th><FaMapMarkerAlt /> Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {internships.length > 0 ? (
                        internships.map((internship) => (
                            <tr key={internship.id}>
                                <td>{internship.company}</td>
                                <td>{internship.role}</td>
                                <td>{internship.startDate}</td>
                                <td>{internship.endDate}</td>
                                <td>{internship.location}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(internship.id)}
                                    >
                                        <FaTrash className="me-1" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No internship entries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InternshipEntries;
