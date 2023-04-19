import React, { useEffect, useState } from "react";
import Header from "./header";

const Dashboard = () => {
  const [name, setName] = useState();

  const displayName = () => {
    let register = localStorage.getItem("registration");
    let registerRes = JSON.parse(register);
    console.log("registerRes", registerRes);
    let logindata = localStorage.getItem("login");
    let loginRes = JSON.parse(logindata);
    console.log("logindata", loginRes);
    let findData = registerRes.find((ele) => ele.email === loginRes.email);
    console.log("findData", findData);
    if (findData) {
      setName(findData.username);
    }
  };
  useEffect(() => {
    displayName();
  }, [name]);

  return (
    <div>
      <div className="">
      <Header/>
        <h1 className="text-center text-success mt-5">
          Welcome <span className="text-primary">{name}</span>
        </h1>
        <h3 className="text-info text-center mt-3 ">
          You're logged in with React-Redux!!
        </h3>
      </div>
    </div>
  );
};
export default Dashboard;
