import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/action/auth";
import { useNavigate, useParams } from "react-router";
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from "react-router-dom";
import Header from "./header";

const AddPost = () => {
  const { id } = useParams();
 const navigate=useNavigate()
  const [data, setData] = useState({
    title: "",
    post: "",
  });
  const dispatch = useDispatch();
  const { title, post } = data;

  const handleClick = async() => {
    const updateData = {
      userId: id,
      title: title,
      post: post,
    };  
     navigate("/users")
    setData({ title: "", post: "" });
    dispatch(addPost(updateData));
    
  };

  return (
    <div>
    <Header/>
      <h1 className="text-center text-danger mt-5">Addpost</h1>
      <div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example1cg">
            Title
          </label>
          <input
            type="text"
            id="form3Example1cg"
            className="form-control"
            name="title"
            value={title}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example1cg">
            Post
          </label>
          <textarea
            id="form3Example1cg"
            className="form-control"
            rows={5}
            name="post"
            value={post}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-info" onClick={() => handleClick()}>
              Submit
            </button>
          </div>
        </div>
        
          <Link to="/users">
          <button className="btn btn-primary"><BsArrowLeft/></button>
          </Link>
          
         
      </div>
    </div>
  );
};

export default AddPost;
