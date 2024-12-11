import "./App.css";

import Header from "./components/Common/Header";
import Index from "./components/Home/Index";

import AddUser from "./components/User/AddUser";
import ListUsers from "./components/User/ListUsers";
import EditUser from "./components/User/EditUser";

import AddStudent from "./components/Student/AddStudent";
import ListStudents from "./components/Student/ListStudents";
import EditStudent from "./components/Student/EditStudent";

import AddLaptop from "./components/Laptop/AddLaptop";
import ListLaptops from "./components/Laptop/ListLaptops";
import EditLaptop from "./components/Laptop/EditLaptop";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
          
            <Route path="/" element={<Index />} />

            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/list-users" element={<ListUsers />} />
            
            <Route path="/edit-student/:id" element={<EditStudent />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/list-students" element={<ListStudents />} />
            
            <Route path="/edit-laptop/:id" element={<EditLaptop />} />
            <Route path="/add-laptop" element={<AddLaptop />} />
            <Route path="/list-laptops" element={<ListLaptops />} />
          </Routes>
          
        </div>
      </header>
    </div>
  );
}

export default App;
