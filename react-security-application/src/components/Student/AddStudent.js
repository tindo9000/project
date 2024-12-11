import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import '../Common/CustomForm.css';

const AddStudent = () => {
    const navigate = useNavigate();
    const endpoint = "http://localhost:8080/student"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        registrationNumber: "",
        program: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    }

    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
                },
                body: JSON.stringify(student),
            }).then(navigate('/list-students'));
        } catch (error) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='custom-form'>
            <div className='heading'>
            {isLoading && <Loader />}
            {error && <p>Error: {error}</p>}
                <p>New Student</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" required="required" value={student.firstName} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" required="required" value={student.lastName} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="emailAddress" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailAddress" name="emailAddress" required="required" value={student.emailAddress} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="phoneNumber" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phoneNumber" name="phoneNumber" required="required" value={student.phoneNumber} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="registrationNumber" className="form-label">Registration Number</label>
                    <input type="text" className="form-control" id="registrationNumber" name="registrationNumber" required="required" value={student.registrationNumber} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="program" className="form-label">Program</label>
                    <input type="text" className="form-control" id="program" name="program" required="required" value={student.program} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Add Student</button>
            </form>
        </div>
    )
}

export default AddStudent