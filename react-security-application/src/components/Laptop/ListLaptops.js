import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ListLaptops = () => {
  const endpoint = "http://localhost:8080/laptop";

  const [laptops, setLaptops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLaptop = async (id) => {
    setIsLoading(true);
    try {
      fetch(endpoint.concat("/" + id), {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 9907474e920b27113374e35e13030839ad30c1e8',
        }
      }).then(setLaptops(laptops.filter((item) => item.id !== id)));
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
      .then(json => setLaptops(json))
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false);
    }
  }, []);

  if (laptops.length < 1) {
    return <center><h1>no laptops found</h1></center>;
  } else {
    return (
      <div className="mt-5">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Student Id</th>
              <th>Serial Number</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Color</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {laptops.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.student_id}</td>
                  <td>{item.serial_number}</td>
                  <td>{item.brand}</td>
                  <td>{item.model}</td>
                  <td>{item.color}</td>
                  <td>
                    <Link to={`/edit-laptop/${item.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>

                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => deleteLaptop(item.id)}
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

export default ListLaptops;
