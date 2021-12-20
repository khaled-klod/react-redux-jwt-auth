// Render Prop
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const options = [
    { name: "User", value: "user" },
    { name: "Admin", value: "admin" },
    { name: "Moderator", value: "moderator" },
  ];

  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{ email: "", password: "", username: "", roles: [] }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.username) {
            errors.username = "Username required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$$/i.test(values.password)
          ) {
            errors.password =
              "Minimum eight characters, at least one letter and one number for password";
          }
          if (!values.roles || values.roles.length === 0) {
            errors.roles = "Required";
          }
          console.log(`errors`, errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:8080/api/auth/signup", values)
            .then((response) => {
              navigate("/signin");
            })
            .catch((err) => {
              setErrorMessage((err as any).response.data.message);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="p-3">
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <Field type="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <label htmlFor="roles">Roles</label>
              <Field component="select" id="roles" name="roles" multiple={true}>
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </Field>
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {errorMessage ? <div>Sign up error: {errorMessage}</div> : null}
    </div>
  );
};

export default SignUp;
