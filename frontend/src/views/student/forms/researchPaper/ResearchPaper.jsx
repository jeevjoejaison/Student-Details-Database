import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt, faBook, faUsers, faUniversity, faIdBadge,
    faAlignLeft, faBookOpen, faFlask, faChartBar,
    faComments, faFlagCheckered, faBookmark, faHashtag,
    faLink, faBalanceScale, faSearch
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const ResearchPaperSubmission = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        authors: "",
        affiliations: "",
        orcid: "",
        abstract: "",
        literatureReview: "",
        methodology: "",
        results: "",
        discussion: "",
        conclusion: "",
        volumeIssue: "",
        doi: "",
        license: "CC BY 4.0",
        bibliography: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
    };

    return (
        <div className="bg-white p-4 rounded shadow d-flex flex-column" style={{ maxWidth: "900px", height: "100vh", overflowY: "auto" }}>
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FontAwesomeIcon icon={faFileAlt} /> Research Paper Submission
                </h1>
            </div>

            {/* Search Form */}
            <div className="mb-4">
                <label className="form-label"><FontAwesomeIcon icon={faSearch} /> Search Papers</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title, author, or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <form className="flex-grow-1" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faBook} /> Paper Title<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faUsers} /> Authors<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="authors" value={formData.authors} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faUniversity} /> Affiliations<span className="text-danger">*</span></label>
                        <input type="text" className="form-control" name="affiliations" value={formData.affiliations} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faIdBadge} /> ORCID iD</label>
                        <input type="text" className="form-control" name="orcid" value={formData.orcid} onChange={handleChange} />
                    </div>

                    <div className="col-12">
                        <label className="form-label"><FontAwesomeIcon icon={faAlignLeft} /> Abstract<span className="text-danger">*</span></label>
                        <textarea className="form-control" rows="2" name="abstract" value={formData.abstract} onChange={handleChange} required></textarea>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faBookOpen} /> Literature Review</label>
                        <textarea className="form-control" rows="2" name="literatureReview" value={formData.literatureReview} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faFlask} /> Methodology</label>
                        <textarea className="form-control" rows="2" name="methodology" value={formData.methodology} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faChartBar} /> Results</label>
                        <textarea className="form-control" rows="2" name="results" value={formData.results} onChange={handleChange}></textarea>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faComments} /> Discussion</label>
                        <textarea className="form-control" rows="2" name="discussion" value={formData.discussion} onChange={handleChange}></textarea>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label"><FontAwesomeIcon icon={faFlagCheckered} /> Conclusion</label>
                        <textarea className="form-control" rows="2" name="conclusion" value={formData.conclusion} onChange={handleChange}></textarea>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faHashtag} /> Volume/Issue</label>
                        <input type="text" className="form-control" name="volumeIssue" value={formData.volumeIssue} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faLink} /> DOI</label>
                        <input type="text" className="form-control" name="doi" value={formData.doi} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label"><FontAwesomeIcon icon={faBalanceScale} /> License</label>
                        <select className="form-select" name="license" value={formData.license} onChange={handleChange}>
                            <option>CC BY 4.0</option>
                            <option>CC BY-SA 4.0</option>
                            <option>All Rights Reserved</option>
                            <option>Public Domain</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label"><FontAwesomeIcon icon={faBook} /> Bibliography</label>
                        <textarea className="form-control" rows="2" name="bibliography" value={formData.bibliography} onChange={handleChange}></textarea>
                    </div>
                </div>

                <div className="d-flex justify-content-end gap-3 mt-3">
                    <button type="reset" className="btn btn-danger">Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit Paper</button>
                </div>
            </form>
        </div>
    );
};

export default ResearchPaperSubmission;
