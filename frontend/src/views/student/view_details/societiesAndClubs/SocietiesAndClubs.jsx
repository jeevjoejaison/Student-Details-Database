import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaList, FaTrash } from "react-icons/fa";

const ViewSocietiesClubs = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch societies/clubs from API
    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/societies-clubs"); // Replace with your API
            setClubs(response.data);
        } catch (error) {
            console.error("Error fetching clubs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete an entry
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            try {
                await axios.delete(`http://localhost:5000/societies-clubs/${id}`);
                setClubs(clubs.filter(club => club.id !== id));
                alert("Entry deleted successfully.");
            } catch (error) {
                console.error("Error deleting entry:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FaList className="me-2" /> Societies/Clubs Entries
                </h1>
                <p>View all the entries you have submitted.</p>
            </div>

            {loading ? (
                <p className="text-center">Loading entries...</p>
            ) : (
                <table className="table table-bordered">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>Category</th>
                            <th>Club/Society Name</th>
                            <th>Membership Type</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clubs.length > 0 ? (
                            clubs.map(club => (
                                <tr key={club.id}>
                                    <td>{club.category}</td>
                                    <td>{club.name}</td>
                                    <td>{club.membership}</td>
                                    <td>{club.description}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(club.id)}>
                                            <FaTrash className="me-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No entries found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            <div className="text-center text-secondary mt-3">
                <p>End of list</p>
            </div>
        </div>
    );
};

export default ViewSocietiesClubs;
