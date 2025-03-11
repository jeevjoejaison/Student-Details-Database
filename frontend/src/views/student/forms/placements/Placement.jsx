import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faUserTie,
  faAlignLeft,
  faCalendarAlt,
  faMoneyBillWave,
  faCogs,
  faUniversity,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const PlacementDetailsForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    location: "",
    role: "",
    description: "",
    joiningDate: "",
    ctc: "",
    coreNonCore: "",
    campusType: "",
    offerLetter: null,
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
    console.log("Placement Details Submitted:", formData);
  };

  return (
    <div className="bg-white p-4 rounded shadow" style={{ width: "700px" }}>
      <div className="text-center mb-4">
        <h1 className="text-primary">
          <FontAwesomeIcon icon={faBuilding} /> Placement Details
        </h1>
        <p>
          Fields marked with <span className="text-danger">*</span> are required.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faBuilding} /> Company <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faUserTie} /> Role <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
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

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faCalendarAlt} /> Joining Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              <FontAwesomeIcon icon={faMoneyBillWave} /> CTC <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="ctc"
              value={formData.ctc}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faCogs} /> Core or Non-Core <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            name="coreNonCore"
            value={formData.coreNonCore}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="Core">Core</option>
            <option value="Non-Core">Non-Core</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faUniversity} /> On-Campus or Off-Campus <span className="text-danger">*</span>
          </label>
          <select
            className="form-select"
            name="campusType"
            value={formData.campusType}
            onChange={handleChange}
            required
          >
            <option value="">Choose...</option>
            <option value="On-Campus">On-Campus</option>
            <option value="Off-Campus">Off-Campus</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            <FontAwesomeIcon icon={faFileUpload} /> Offer Letter<span className="text-danger">*</span>
          </label>
          <input
            type="file"
            className="form-control"
            name="offerLetter"
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

export default PlacementDetailsForm;
