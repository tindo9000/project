import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import '../Common/CustomForm.css';

const AddUser = () => {
    const navigate = useNavigate();
    const endpoint = "http://localhost:8080/user"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
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
                body: JSON.stringify(user),
            }).then(navigate('/list-users'));
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
                <p>New User</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" required="required" value={user.firstName} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" required="required" value={user.lastName} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required="required" value={user.email} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required="required" value={user.password} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Add User</button>
            </form>
        </div>
    )
}

export default AddUser