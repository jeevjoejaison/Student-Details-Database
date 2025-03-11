import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBriefcase,
  FaBuilding,
  FaUserTie,
  FaCalendarDay,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaMoneyBillWave,
  FaFileUpload,
} from "react-icons/fa";

const InternshipForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    stipend: "",
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
    console.log("Form Data Submitted:", formData);
  };

  return (
 
      <div className="p-4 bg-white rounded shadow" style={{ width: "700px" }}>
        <div className="text-center mb-3">
          <h2 className="text-primary">
            <FaBriefcase /> Internship Details
          </h2>
          <p className="text-muted">Fields marked with <span className="text-danger">*</span> are required.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><FaBuilding /> Company <span className="text-danger">*</span></label>
            <input type="text" name="company" className="form-control" placeholder="Enter company name" value={formData.company} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label"><FaUserTie /> Role <span className="text-danger">*</span></label>
            <input type="text" name="role" className="form-control" placeholder="Enter role" value={formData.role} onChange={handleChange} required />
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label"><FaCalendarDay /> Start Date <span className="text-danger">*</span></label>
              <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label"><FaCalendarDay /> End Date <span className="text-danger">*</span></label>
              <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label"><FaMapMarkerAlt /> Location <span className="text-danger">*</span></label>
            <input type="text" name="location" className="form-control" placeholder="Enter location" value={formData.location} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label"><FaAlignLeft /> Description</label>
            <textarea name="description" className="form-control" rows="3" placeholder="Brief description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          
          <div className="mb-3">
            <label className="form-label"><FaMoneyBillWave /> Stipend<span className="text-danger">*</span></label>
            <input type="text" name="stipend" className="form-control" placeholder="Enter stipend amount (if any)" value={formData.stipend} onChange={handleChange} required/>
          </div>
          
          <div className="mb-3">
            <label className="form-label"><FaFileUpload /> Offer Letter<span className="text-danger">*</span></label>
            <input type="file" name="offerLetter" className="form-control" onChange={handleChange} required/>
          </div>
          
          <div className="d-flex justify-content-end gap-2">
            <button type="reset" className="btn btn-danger">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>

  );
};

export default InternshipForm;
