import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faTag, faCalendarAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './manageStudent.css';

const DepartmentForm = () => {
    const [formData, setFormData] = useState({
        department: '',
        year: ''
    });
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    // Fetch students (mocking data here for example)
    useEffect(() => {
        // Replace with an actual API call
        const fetchStudents = async () => {
            // Mock student data
            const studentList = [
                { name: 'Chrisz Charls', rollNo: 'B220244CS', section: 'CS03', fa: 'Verhit T', useful: 'chrisz.b220244' },
                { name: 'Sreehari S', rollNo: 'B220546CS', section: 'CS04', fa: 'Manjusha', useful: 'sreehari.b2205' },
                { name: 'Jeev Joe Jaison', rollNo: 'B220356CS', section: 'CS03', fa: 'Verit T', useful: 'jeev.b220356c' },
                { name: 'John Doe', rollNo: 'B220148CS', section: 'CS02', fa: 'Kumar', useful: 'john.doe.b220148' },
                { name: 'Jane Smith', rollNo: 'B220324CS', section: 'CS01', fa: 'Maya', useful: 'jane.smith.b220324' },
                { name: 'Alex Brown', rollNo: 'B220312CS', section: 'CS04', fa: 'Ravi K', useful: 'alex.brown.b220312' },
                { name: 'Olivia White', rollNo: 'B220287CS', section: 'CS02', fa: 'Nisha', useful: 'olivia.white.b220287' },
                { name: 'Liam Wilson', rollNo: 'B220569CS', section: 'CS01', fa: 'Sunil', useful: 'liam.wilson.b220569' },
                { name: 'Emma Johnson', rollNo: 'B220632CS', section: 'CS03', fa: 'Tanuja', useful: 'emma.johnson.b220632' },
                { name: 'Lucas Miller', rollNo: 'B220244EE', section: 'EE01', fa: 'Bharat', useful: 'lucas.miller.b220244ee' },
                { name: 'Sophia Davis', rollNo: 'B220528EE', section: 'EE02', fa: 'Pradeep', useful: 'sophia.davis.b220528ee' },
                { name: 'Mason Garcia', rollNo: 'B220431EE', section: 'EE03', fa: 'Chandran', useful: 'mason.garcia.b220431ee' },
                { name: 'Amelia Martinez', rollNo: 'B220646ME', section: 'ME01', fa: 'Arvind', useful: 'amelia.martinez.b220646me' },
                { name: 'Ethan Rodriguez', rollNo: 'B220774ME', section: 'ME02', fa: 'Raghav', useful: 'ethan.rodriguez.b220774me' },
                { name: 'Isabella Taylor', rollNo: 'B220214ME', section: 'ME03', fa: 'Harish', useful: 'isabella.taylor.b220214me' },
                { name: 'William Anderson', rollNo: 'B220369EE', section: 'EE04', fa: 'Vinod', useful: 'william.anderson.b220369ee' },
                { name: 'Charlotte Thomas', rollNo: 'B220789CS', section: 'CS02', fa: 'Latha', useful: 'charlotte.thomas.b220789cs' },
                { name: 'Daniel Harris', rollNo: 'B220645CS', section: 'CS04', fa: 'Sanjay', useful: 'daniel.harris.b220645cs' },
                { name: 'Mia King', rollNo: 'B220132EE', section: 'EE01', fa: 'Rita', useful: 'mia.king.b220132ee' },
                { name: 'Benjamin Lee', rollNo: 'B220225ME', section: 'ME04', fa: 'Vikas', useful: 'benjamin.lee.b220225me' }
            ];

            setStudents(studentList);
        };

        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        navigate('/student-dashboard');
    };

    return (
        <div className="container mt-4 p-4 bg-white rounded shadow" style={{ maxWidth: '950px', minHeight: '600px' }}>
            <div className="text-center mb-4">
                <h1 className="text-primary">
                    <FontAwesomeIcon icon={faUsers} /> Department Management
                </h1>
            </div>
            <p>Fields marked with <span className="text-danger">*</span> are required.</p>
            <form onSubmit={handleSubmit}>
                {/* Department and Year Selection on the same line */}
                <div className="mb-3 row">
                    {/* Department Dropdown */}
                    <div className="col-md-6">
                        <label className="form-label">
                            <FontAwesomeIcon icon={faTag} /> Select Department <span className="text-danger">*</span>
                        </label>
                        <select className="form-select" name="department" value={formData.department} onChange={handleChange} required>
                            <option value="">Choose...</option>
                            <option>Computer Science</option>
                            <option>Electrical Engineering</option>
                            <option>Mechanical Engineering</option>
                        </select>
                    </div>

                    {/* Year Dropdown */}
                    <div className="col-md-6">
                        <label className="form-label">
                            <FontAwesomeIcon icon={faCalendarAlt} /> Select Year <span className="text-danger">*</span>
                        </label>
                        <select className="form-select" name="year" value={formData.year} onChange={handleChange} required>
                            <option value="">Choose...</option>
                            <option>First Year</option>
                            <option>Second Year</option>
                            <option>Third Year</option>
                            <option>Fourth Year</option>
                        </select>
                    </div>
                </div>

                {/* Get Result Button */}
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">
                        Get Result
                    </button>
                </div>
            

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>ROLL NO.</th>
                            <th>SECTION</th>
                            <th>FA</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.name}</td>
                                <td>{student.rollNo}</td>
                                <td>{student.section}</td>
                                <td>{student.fa}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary">
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </form>
            {/* Back Button */}
            <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn btn-danger" onClick={() => navigate('/student-dashboard')}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default DepartmentForm;
