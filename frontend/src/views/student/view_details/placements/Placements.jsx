import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaUserTie,
    FaCalendarAlt,
    FaRupeeSign,
    FaFileDownload,
    FaBuilding,
    FaLaptopCode,
    FaTrash
} from "react-icons/fa";

const PlacementEntries = () => {
    const [placements, setPlacements] = useState([]);

    // Fetch placement data from API
    useEffect(() => {
        fetchPlacements();
    }, []);

    const fetchPlacements = async () => {
  
    };

    // Delete a placement entry
    const handleDelete = async (id) => {
        
    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FaBriefcase className="me-2" /> Placement Entries
                </h1>
            </div>

            <table className="table table-bordered">
                <thead className="bg-primary text-white">
                    <tr>
                        <th><FaBuilding /> Company</th>
                        <th><FaMapMarkerAlt /> Location</th>
                        <th><FaUserTie /> Role</th>
                        <th><FaCalendarAlt /> Joining Date</th>
                        <th><FaRupeeSign /> CTC</th>
                        <th><FaLaptopCode /> Job Type</th>
                        <th>Hiring Mode</th>
                        <th><FaFileDownload /> Offer Letter</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.length > 0 ? (
                        placements.map((placement) => (
                            <tr key={placement.id}>
                                <td>{placement.company}</td>
                                <td>{placement.location}</td>
                                <td>{placement.role}</td>
                                <td>{placement.joiningDate}</td>
                                <td>{placement.ctc}</td>
                                <td>{placement.jobType}</td>
                                <td>{placement.hiringMode}</td>
                                <td>
                                    <a href={placement.offerLetter} className="text-primary fw-bold" download>
                                        <FaFileDownload className="me-1" /> Download
                                    </a>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(placement.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No placement entries found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PlacementEntries;
