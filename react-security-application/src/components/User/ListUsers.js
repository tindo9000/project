import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ListUsers = () => {
  const endpoint = "http://localhost:8080/user";

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      fetch(endpoint.concat("/" + id), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
        }
      }).then(setUsers(users.filter((item) => item.id !== id)));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
        }
      }).then(response => response.json())
      .then(json => setUsers(json))
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  if (users.length < 1) {
    return <center><h1>no users found</h1></center>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to={`/edit-user/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => deleteUser(item.id)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ListUsers;
