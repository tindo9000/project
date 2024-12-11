import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import '../Common/CustomForm.css';

const EditLaptop = () => {
  const [laptop, setLaptop] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const endpoint = "http://localhost:8080/laptop";

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(endpoint.concat("/" + id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
        }
      }).then(response => response.json())
      .then(json => setLaptop(json));
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      fetch(endpoint.concat("/") + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
        },
        body: JSON.stringify({
          "studentId": parseInt(laptop.student_id),
          "serialNumber": laptop.serial_number,
          "brand": laptop.brand,
          "model": laptop.model,
          "color": laptop.color,
        }),
      }).then(navigate("/list-laptops"));
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-form">
      <div className="heading">
      {isLoading && <Loader />}
      {error && <p>Error: {error}</p>}
        <p>Edit Laptop</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="student_id" className="form-label">
            Student Id
          </label>
          <input
            type="text"
            className="form-control"
            id="student_id"
            name="student_id"
            value={laptop.student_id}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="serial_number" className="form-label">
            Serial Number
          </label>
          <input
            type="text"
            className="form-control"
            id="serial_number"
            name="serial_number"
            value={laptop.serial_number}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={laptop.brand}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="model" className="form-label">
            Model
          </label>
          <input
            type="text"
            className="form-control"
            id="model"
            name="model"
            value={laptop.model}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="color" className="form-label">
            Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={laptop.color}
            required="required"
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Update Laptop
        </button>
      </form>
    </div>
  );
};
export default EditLaptop;
