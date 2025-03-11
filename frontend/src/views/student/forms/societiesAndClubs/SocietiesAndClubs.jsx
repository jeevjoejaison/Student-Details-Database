import React, { useState } from "react";
import { FaUsers, FaTag, FaSignature, FaIdCard, FaFileUpload, FaAlignLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const SocietiesForm = () => {
    const [formData, setFormData] = useState({
        category: "",
        clubName: "",
        membershipType: "",
        proof: null,
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, proof: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
    };

    return (
        <div className="bg-white p-4 rounded shadow" style={{ width: "700px" }}>
            <div className="text-center mb-4">
                <h1 className="text-primary"><FaUsers /> Societies/Clubs Details</h1>
                <p>Fields marked with <span className="text-danger">*</span> are required.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label"><FaTag /> Select Category <span className="text-danger">*</span></label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Choose...</option>
                        <option>Cultural Club</option>
                        <option>Technical Club</option>
                        <option>Professional Society</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label"><FaSignature /> Name of the Club/Society <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" name="clubName" value={formData.clubName} onChange={handleChange} placeholder="Enter club/society name" required />
                </div>

                <div className="mb-3">
                    <label className="form-label"><FaIdCard /> Membership Type <span className="text-danger">*</span></label>
                    <select className="form-select" name="membershipType" value={formData.membershipType} onChange={handleChange} required>
                        <option value="">Choose...</option>
                        <option>Member</option>
                        <option>Secretary</option>
                        <option>Joint Secretary</option>
                        <option>Treasurer</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label"><FaFileUpload /> Proof (if any)</label>
                    <input type="file" className="form-control" onChange={handleFileChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label"><FaAlignLeft /> Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Provide a brief description"></textarea>
                </div>

                <div className="d-flex justify-content-end gap-3">
                    <button type="reset" className="btn btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-primary">Continue</button>
                </div>
            </form>
        </div>
    );
};

export default SocietiesForm;
