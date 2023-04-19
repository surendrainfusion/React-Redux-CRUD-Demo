import React, { Fragment, useEffect, useMemo, useState } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const Post = () => {
  const getPost = JSON.parse(localStorage.getItem("post"));
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortOrder, setSortOrder] = useState("asc");
  const [users, setUsers] = useState(getPost);

  // Start Sorting part
  const handleSort = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });

    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field); // set the current sort field
  };
  const [sortField, setSortField] = useState(null);

  const sortedAndFilteredData = useMemo(() => {
    const filteredUsers = users.filter((user) => {
      if (searchQuery === "") {
        return true; // if no search query, return all items
      } else if (
        user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.post.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return true; // if item title matches search query, return the item
      } else {
        return false; // if item title does not match search query, do not return the item
      }
    });

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredUsers.slice(firstPageIndex, lastPageIndex);
  }, [users, sortOrder, searchQuery, currentPage, pageSize]);

  // End of Sorting Part

  // Start of Pagination
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(users.length / pageSize); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const total = users.length;
  const onButtonClick = (type) => {
    if (type === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (type === "next" && currentPage < Math.ceil(total / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // End of Pagination

  return (
    <div className="container-fluid">
      <Header />
      <h1 className="text-center text-danger mt-5">Show all Post</h1>
      <div className="mt-5">
        <Link to="/users">
          <button className="btn btn-primary mb-4">
            <BsArrowLeft />
          </button>
        </Link>
        <div className="d-flex justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search Title & Post ....."
            className="w-25 mt-4"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
        <table className="table table-striped">
          <thead className="bg-info ">
            <tr>
              <th
                onClick={() => handleSort("title")}
                className={sortField === "title" ? "active" : ""}
              >
                title {sortOrder === "asc" ? "↑" : "↓"}
              </th>
              <th
                onClick={() => handleSort("post")}
                className={sortField === "post" ? "active" : ""}
              >
                post {sortOrder === "asc" ? "↑" : "↓"}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.title}</td>
                  <td>{val.post}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length > 0 ? (
          <Fragment>
            <label htmlFor="pageSize" className="me-3 mb-5">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                if (e.target.value === "all data") {
                  setPageSize(getPost.length);
                  setCurrentPage(1);
                } else {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={getPost.length}>all data</option>
            </select>

            <div className="my-3 text-center">
              {currentPage > 1 && (
                <button
                  className="px-3 py-1 m-1 text-center btn btn-primary"
                  onClick={() => onButtonClick("prev")}
                >
                  Previous
                </button>
              )}

              {pageNumber.map((Elem) => {
                return (
                  <Fragment>
                    <button
                      className="px-3 py-1 m-1 text-center btn btn-outline-dark"
                      onClick={() => ChangePage(Elem)}
                    >
                      {Elem}
                    </button>
                  </Fragment>
                );
              })}

              {currentPage < Math.ceil(total / pageSize) && (
                <button
                  className="px-3 py-1 m-1 text-center btn btn-primary"
                  onClick={() => onButtonClick("next")}
                >
                  Next
                </button>
              )}
            </div>
          </Fragment>
        ) : (
          <h1 className="text-center text-primary">No Post</h1>
        )}
      </div>
    </div>
  );
};

export default Post;
