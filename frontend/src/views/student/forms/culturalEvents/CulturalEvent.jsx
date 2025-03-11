import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTag, faSignature, faMapMarkerAlt, faCalendarAlt, faTrophy, faFileUpload, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CulturalEvent.css';

const CulturalEventForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        eventName: '',
        location: '',
        date: '',
        awards: '',
        proof: null,
        description: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        navigate('/student-dashboard');
    };

    return (
        <div className="container mt-5 p-4 bg-white rounded shadow" style={{ width: '700px', height:'900px' }}>
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FontAwesomeIcon icon={faUsers} /> Cultural Events Registration
                </h1>
                
            </div>
            <p>Fields marked with <span className="text-danger">*</span> are required.</p>
            <form onSubmit={handleSubmit}>
                {/* Category Selection */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faTag} /> Select Category <span className="text-danger">*</span>
                    </label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Choose...</option>
                        <option>Cultural Club</option>
                        <option>Technical Club</option>
                        <option>Professional Society</option>
                    </select>
                </div>

                {/* Event Name */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faSignature} /> Name of the Event <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Enter event name" required />
                </div>

                {/* Location */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> Location of the Event <span className="text-danger">*</span>
                    </label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} placeholder="Enter event location" required />
                </div>

                {/* Date */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faCalendarAlt} /> Date of the Event <span className="text-danger">*</span>
                    </label>
                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                {/* Awards */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faTrophy} /> Awards (if any)
                    </label>
                    <select className="form-select" name="awards" value={formData.awards} onChange={handleChange}>
                        <option value="">Choose...</option>
                        <option>Best Performance</option>
                        <option>Best Decor</option>
                        <option>Best Theme</option>
                        <option>Best Costume</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* File Upload */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faFileUpload} /> Proof (if any)
                    </label>
                    <input type="file" className="form-control" name="proof" onChange={handleChange} />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label className="form-label">
                        <FontAwesomeIcon icon={faAlignLeft} /> Description
                    </label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Provide a brief description of the event"></textarea>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-end gap-3">
                    <button type="reset" className="btn btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default CulturalEventForm;
