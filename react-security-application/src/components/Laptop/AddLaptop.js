import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";
import Loader from '../Common/Loader';
import '../Common/CustomForm.css';

const AddLaptop = () => {
    const navigate = useNavigate();
    const endpoint = "http://localhost:8080/laptop"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [laptop, setLaptop] = useState({
        studentId: "",
        serialNumber: "",
        brand: "",
        model: "",
        color: ""
    })

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setLaptop({ ...laptop, [name]: value });
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
                body: JSON.stringify({
                  "studentId": parseInt(laptop.studentId),
                  "serialNumber": laptop.serialNumber,
                  "brand": laptop.brand,
                  "model": laptop.model,
                  "color": laptop.color,
                }),
            }).then(navigate('/list-laptops'));
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
                <p>New Laptop</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label for="studentId" className="form-label">Student Id</label>
                    <input type="number" min="1" className="form-control" id="studentId" name="studentId" required="required" value={laptop.studentId} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="serialNumber" className="form-label">Serial Number</label>
                    <input type="text" className="form-control" id="serialNumber" name="serialNumber" required="required" value={laptop.serialNumber} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label for="brand" className="form-label">Brand</label>
                    <input type="text" className="form-control" id="brand" name="brand" required="required" value={laptop.brand} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="model" className="form-label">Model</label>
                    <input type="text" className="form-control" id="model" name="model" required="required" value={laptop.model} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label for="color" className="form-label">Color</label>
                    <input type="text" className="form-control" id="color" name="color" required="required" value={laptop.color} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Add Laptop</button>
            </form>
        </div>
    )
}

export default AddLaptop