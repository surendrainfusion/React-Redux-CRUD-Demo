import React, { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./header";

// const possiblePageSizes = [5, 10, 20];
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setusername] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const getRegisterData = JSON.parse(localStorage.getItem("registration"));

  // Start Sorting part
  const sortedData = useMemo(() => {
    if (sortField) {
      const sortedUsers = [...getRegisterData].sort((a, b) => {
        if (username) {
          return a.username.localeCompare(b.username);
        } else {
          return b.username.localeCompare(a.username);
        }
      });
      return sortedUsers;
    } else {
      return getRegisterData;
    }
  }, [getRegisterData, username, sortField]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field) => {
    setusername(!username);
    setSortField(field);
    // setCurrentPage(1); // reset current page when sorting to start at page 1
  };
  // End of Sorting Part

  // Start of Pagination

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(getRegisterData.length / pageSize); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const total = getRegisterData.length;
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
      <h1 className="text-center text-primary mt-5">Users</h1>
      <div className="mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th
                onClick={() => handleSort("username")}
                className={sortField === "username" ? "active" : ""}
              >
                username {username === "username" ? "↑" : "↓"}
              </th>
              <th
                onClick={() => handleSort("email")}
                className={sortField === "email" ? "active" : ""}
              >
                email {username === "asc" ? "↑" : "↓"}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((ele) => {
              return (
                <Fragment key={ele.id}>
                  <tr>
                    <td>{ele.id}</td>
                    <td>{ele.username}</td>
                    <td>{ele.email}</td>

                    <td>
                      <Link to={`/addpost/${ele.id}`}>
                        <button className="btn btn-primary me-3">
                          Add Post
                        </button>
                      </Link>
                      <Link to={`/viewpost/${ele.id}`}>
                        <button className="btn btn-success">View Post</button>
                      </Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
        <label htmlFor="pageSize" className="me-3">
          Rows per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => {
            if (e.target.value === "show all Users") {
              setPageSize(getRegisterData.length);
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
          <option value={getRegisterData.length}>show all Users</option>
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
      </div>
    </div>
  );
};

export default Users;
