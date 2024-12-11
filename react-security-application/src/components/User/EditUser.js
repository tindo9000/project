import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import '../Common/CustomForm.css';

const EditUser = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const endpoint = "http://localhost:8080/user";

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
      .then(json => setUser(json));
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  const handelInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
          "firstName": user.first_name,
          "lastName": user.last_name,
          "email": user.email,
          "password": user.password,
        }),
      }).then(navigate("/list-users"));
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
        <p>Edit User</p>
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
            value={user.first_name}
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
            value={user.last_name}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            required="required"
            onChange={handelInput}
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            required="required"
            onChange={handelInput}
          />
        </div>
        <button type="submit" className="btn btn-primary submit-btn">
          Update User
        </button>
      </form>
    </div>
  );
};
export default EditUser;
