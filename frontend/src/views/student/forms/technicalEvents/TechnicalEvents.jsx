import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faHeading,
  faAlignLeft,
  faMapMarkerAlt,
  faCalendarDay,
  faTrophy,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const TechnicalEventForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    eventName: "",
    location: "",
    date: "",
    awards: "",
    proof: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
  
      <div className="bg-white p-4 rounded shadow" style={{ width: "700px" }}>
        <div className="text-center mb-4">
          <h1 className="text-primary">
            <FontAwesomeIcon icon={faCalendarAlt} /> Technical Events
          </h1>
          <p>
          Fields marked with <span className="text-danger">*</span> are
          required.
        </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faTag} /> Select Category <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose category</option>
              <option>Technical Workshop</option>
              <option>Coding Competition</option>
              <option>Robotics Event</option>
              <option>Tech Symposium</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faHeading} /> Event Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="eventName"
              value={formData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <FontAwesomeIcon icon={faCalendarDay} /> Date <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faAlignLeft} /> Description
            </label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faTrophy} /> Awards
            </label>
            <select
              className="form-select"
              name="awards"
              value={formData.awards}
              onChange={handleChange}
            >
              <option value="">Select award (if any)</option>
              <option>First Prize</option>
              <option>Second Prize</option>
              <option>Third Prize</option>
              <option>Participation Award</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faFileUpload} /> Proof (if any)
            </label>
            <input
              type="file"
              className="form-control"
              name="proof"
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button type="reset" className="btn btn-danger">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>

  );
};

export default TechnicalEventForm;
