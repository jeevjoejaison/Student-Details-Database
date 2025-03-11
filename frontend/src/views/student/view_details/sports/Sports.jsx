import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    FaList,
    FaTrophy,
    FaUsers,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaAward,
    FaDownload,
    FaTrash
} from "react-icons/fa";

const SportsEvents = () => {
    const [events, setEvents] = useState([]);

    // Fetch events from API
    useEffect(() => {

    }, []);

    const fetchEvents = async () => {
 
    };

    // Delete event
    const handleDelete = async (id) => {

    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FaList className="me-2" /> Sports Events Entries
                </h1>
            </div>

            <table className="table table-bordered">
                <thead className="bg-primary text-white">
                    <tr>
                        <th><FaTrophy /> Event Name</th>
                        <th><FaUsers /> Participation</th>
                        <th><FaMapMarkerAlt /> Location</th>
                        <th><FaCalendarAlt /> Date</th>
                        <th><FaAward /> Awards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.name}</td>
                                <td>{event.participation}</td>
                                <td>{event.location}</td>
                                <td>{event.date}</td>
                                <td>{event.award}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>
                                        <FaTrash /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No sports events found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SportsEvents;
