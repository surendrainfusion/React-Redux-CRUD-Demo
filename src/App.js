import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Registeration from "./components/Registeration";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import AddPost from "./components/AddPost";
import Post from "./components/Post";
import ViewPost from "./components/ViewPost";
import Edit from "./components/Edit";


const App = () => {
  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Registeration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/users" element={<Users/>}></Route>
            <Route path="/addpost/:id" element={<AddPost/>}></Route>
            <Route path="/post" element={<Post/>}></Route>
            <Route path="/viewpost/:id" element={<ViewPost/>}></Route>
            <Route path="/edit/:id" element={<Edit/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
