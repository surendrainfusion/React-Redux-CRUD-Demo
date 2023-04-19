import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Edit = () => {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    title: "",
    post: "",
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("post")) || [];
    setEdit(data.find((post) => post.id == id) || { title: "", post: "" });
    // setPosts(data);
  }, [id]);
  const { title, post } = edit;

 useEffect(()=>{
  const getPostData = JSON.parse(localStorage.getItem("post"));
  const matchEditData = getPostData.filter((data) => data.id == id);
  setPosts(matchEditData)
 },[id])

  const handleUpdate = (userId) => {
    const updatedPosts = JSON.parse(localStorage.getItem("post")).map(
      (post) => {
        if (id == post.id) {
          return { ...post, ...edit };
        } else {
          return post;
        }
      }
    );

    localStorage.setItem("post", JSON.stringify(updatedPosts));
    navigate(`/viewpost/${userId}`);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEdit({ ...edit, [name]: value });
  };
  return (
    <div>
      <div className="container">
        <h1 className="text-center text-danger mt-5">Edit Post</h1>
        <div className="mt-5">
          <form>
            {posts.map((e) => {
              return (
                <Fragment>
                  <div>
                    <label htmlFor="title">title</label>
                    <br />
                    <input
                      name="title"
                      type="text"
                      placeholder="Edit Title"
                      defaultValue={e.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <br />
                  <div>
                    <label htmlFor="post" className="ms-5">
                      post
                    </label>
                    <br />
                    <textarea
                      rows={5}
                      cols={50}
                      type="text"
                      name="post"
                      placeholder="Edit post"
                      defaultValue={e.post}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center mt-5">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleUpdate(e.userId);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </Fragment>
              );
            })}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
