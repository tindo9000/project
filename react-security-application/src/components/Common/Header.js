import React from "react";
import { Link } from "react-router-dom";
import "./Common.css";

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <span className="navbar-text">Security Application</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="add-user">
                  Add User
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="list-users">
                  List Users
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="add-student">
                  Add Student
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="list-students">
                  List Students
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="add-laptop">
                  Add Laptop
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="list-laptops">
                  List Laptops
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
