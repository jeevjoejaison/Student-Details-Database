import React, { useState, useEffect } from "react";
import "./styles.css";

const ViewCulturalEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(false)
    };

    const handleDelete = async (id) => {

    };

    return (
        <div className="container">
            <div className="header">
                <h1><i className="fas fa-users"></i> Submitted Cultural Events</h1>
            </div>

            {loading ? (
                <p>Loading events...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Award</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id}>
                                <td>{event.category}</td>
                                <td>{event.name}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td>{event.award}</td>
                                <td className="actions">
                                    <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewCulturalEvents;
