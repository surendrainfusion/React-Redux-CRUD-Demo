import React, { Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { registartionData } from "../redux/action/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registeration = () => {
  const navigate=useNavigate()
  const yupValidation = Yup.object().shape({
    username: Yup.string()
      .required("Please enter some value.")
      .min(4, "Add minimum 4 characters"),
    email: Yup.string().required("Email id is mendatory").email(),
    password: Yup.string()
      .required("No password provided.")
      .min(5, "Password is too short - should be 5 chars minimum.")
      .max(10, "password is too long - should be 10 chars maximum ")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const formOptions = { resolver: yupResolver(yupValidation) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const dispatch = useDispatch();

  const handleClick = (data) => {
    reset();
    dispatch(registartionData(data));
    toast.success("Registration Successfully!!!");
    navigate("/login")
  };

  return (
    <Fragment>
      <h1 className="text-center text-danger mt-3 mb-5">Registration Form</h1>
      <ToastContainer />
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleSubmit(handleClick)}>
                    <div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example1cg">
                          Your Username
                        </label>
                        <input
                          type="text"
                          id="form3Example1cg"
                          className={`form-control ${
                            errors.username ? "is-invalid" : ""
                          }`}
                          name="username"
                          {...register("username")}
                        />
                        <div className="invalid-feedback">
                          {errors.username?.message}
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example3cg"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          name="email"
                          {...register("email")}
                        />
                        <div className="invalid-feedback">
                          {errors.email?.message}
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cg"
                          className={`form-control ${
                            errors.password ? "is-invalid" : ""
                          }`}
                          name="password"
                          {...register("password")}
                        />
                        <div className="invalid-feedback">
                          {errors.password?.message}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Role</label>
                        <select className="select">
                          <option value="2">User</option>
                          <option value="3">Admin</option>
                        </select>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3g"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?
                      <Link to="/login">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Registeration;
