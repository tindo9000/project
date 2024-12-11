import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import '../Common/CustomForm.css';

const EditStudent = () => {
  const [student, setStudent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const endpoint = "http://localhost:8080/student";

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
      .then(json => setStudent(json));
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
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
          "firstName": student.first_name,
          "lastName": student.last_name,
          "emailAddress": student.email_address,
          "phoneNumber": student.phone_number,
          "registrationNumber": student.registration_number,
          "program": student.program,
        }),
      }).then(navigate("/list-students"));
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
        <p>Edit Student</p>
      </div>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label for="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={student.first_name}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={student.last_name}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="email_address" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email_address"
            name="email_address"
            value={student.email_address}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={student.phone_number}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="registration_number" className="form-label">
            Registration Number
          </label>
          <input
            type="text"
            className="form-control"
            id="registration_number"
            name="registration_number"
            value={student.registration_number}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="program" className="form-label">
            Program
          </label>
          <input
            type="text"
            className="form-control"
            id="program"
            name="program"
            value={student.program}
            required="required"
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Update Student
        </button>
      </form>
    </div>
  );
};
export default EditStudent;
