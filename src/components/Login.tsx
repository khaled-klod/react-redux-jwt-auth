// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { COOKIE, getCookie, setCookie } from "../cookie";
import { useIsAuthenticated } from "../helper";


const Login = () => {
  const navigate = useNavigate();
  const meUser = useIsAuthenticated();

  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  if(getCookie(COOKIE.ACCESS_TOKEN)){
    navigate('/dashboard')
  }
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.username) {
            errors.username = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          // Minimum eight characters, at least one letter and one number:
          if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$$/i.test(values.password)
          ) {
            errors.password =
              "Minimum eight characters, at least one letter and one number for password";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:8080/api/auth/signin", values)
            .then((response: any) => {
              console.log(`response`, response)
              navigate("/dashboard");
              dispatch({
                type: "ADD_ME_USER",
                payload: {
                  username: response.data.username,
                  roles: response.data.roles,
                },
              });
              setCookie(COOKIE.ACCESS_TOKEN, response.data.accessToken, 2)
              setCookie(COOKIE.REFRESH_TOKEN, response.data.refreshToken, 2)
            })
            .catch((err) => {
              setErrorMessage((err as any).response.data.message);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="username" name="username" />
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {errorMessage ? <div>Sign in error: {errorMessage}</div> : null}
    </div>
  );
};

export default Login;
