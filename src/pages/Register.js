import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  Component,
  Fragment,
} from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SIGNUP_MUTATION = gql`
  mutation signup(
    $name: String
    $email: String!
    $password: String!
    $active: Int
  ) {
    signup(name: $name, email: $email, password: $password, active: $active) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

function Register() {
  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted({ data }) {
      if (data) {
        console.log("data", data);
      }
    },
    onError({ error }) {
      if (error) {
        console.log("error", error);
      }
    },
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    active: 2,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <Fragment>
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <a href="/">
              <i className="feather-zap text-success display1-size me-2 ms-0"></i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Sociala.{" "}
              </span>{" "}
            </a>
            <button className="nav-menu me-0 ms-auto"></button>

            <a
              href="/login"
              className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
            >
              로그인
            </a>
            <a
              href="/register"
              className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
            >
              회원가입
            </a>
          </div>
        </div>

        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: `url("https://via.placeholder.com/800x950.png")`,
            }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-4">
                  새로운 <br />
                  계정 만들기
                </h2>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    try {
                      const response = await signup({
                        variables: values,
                      });
                      alert("회원가입을 축하드립니다.");
                      console.log("data22", response);
                      localStorage.setItem("token", response.data.signup.token);
                      setSubmitting(false);
                      window.location.href = "/login";
                    } catch (err) {
                      alert("이미 존재하는 이메일 입니다.");
                      console.log("data", data);
                      console.log("err", err);
                      console.log("error", error);

                      setSubmitting(false);
                    }
                  }}
                >
                  <Form>
                    {" "}
                    <label>이메일</label>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-email text-grey-500 pe-0"></i>
                      <Field
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      />
                    </div>
                    <ErrorMessage name="email" component={"div"} />
                    <label>성함</label>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-user text-grey-500 pe-0"></i>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Name"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      />{" "}
                    </div>
                    <ErrorMessage name="name" component={"div"} />
                    <label>비밀번호</label>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      />{" "}
                    </div>
                    <ErrorMessage name="password" component={"div"} />
                    <label>비밀번호 확인</label>
                    <div className="form-group icon-input mb-3">
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      />{" "}
                    </div>
                    <ErrorMessage name="company" component={"div"} />
                    <div className="form-check text-left mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input mt-2"
                        id="exampleCheck2"
                      />
                      <label className="form-check-label font-xsss text-grey-500">
                        이용약관을 확인하였으며, 이에 동의합니다
                      </label>
                    </div>{" "}
                    <div className="col-sm-12 p-0 text-left">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                        >
                          회원가입
                        </button>
                      </div>
                      <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                       이미 계정이 있으신가요?{" "}
                        <a href="/login" className="fw-700 ms-1">
                          로그인
                        </a>
                      </h6>
                    </div>
                    {/* <button type="submit" className="btn btn-primary mt-3">
                      <span>Sign up</span>
                    </button> */}
                  </Form>
                </Formik>

                {/* <form>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pe-0"></i>
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0"></i>
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div className="form-group icon-input mb-3">
                    <input
                      type="Password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="Password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Confirm Password"
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div>
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck2"
                    />
                    <label className="form-check-label font-xsss text-grey-500">
                      Accept Term and Conditions
                    </label>
                  </div>
                </form> */}

                {/* <div className="col-sm-12 p-0 text-left">
                  <div className="form-group mb-1">
                    <a
                      href="/register"
                      className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                    >
                      Register
                    </a>
                  </div>
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Already have account{" "}
                    <a href="/login" className="fw-700 ms-1">
                      Login
                    </a>
                  </h6>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Register;
