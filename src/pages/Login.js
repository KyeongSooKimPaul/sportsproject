import React, { Component, Fragment } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

function Login() {
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ data }) {
      if (data) {
        console.log("data11", data);
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
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
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
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  내 계정으로 <br />
                  로그인하기
                </h2>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    try {
                      const response = await login({
                        variables: values,
                      });
                      //   alert("반갑습니다");
                      console.log("data22", response);
                      localStorage.setItem("token", response.data.login.token);
                      localStorage.setItem(
                        "userid",
                        response.data.login.user.id
                      );
                      localStorage.setItem("userid", response.data.login.user.id);

                      console.log(
                        "이것은userinfo--------------------------",
                        console.log(localStorage)
                      );
                      console.log("data", response.data.login);

                      setSubmitting(false);
                      alert("반갑습니다");
                      window.location.href = "/";
                    } catch (err) {
                      alert("비밀번호를 다시 확인해주세요");
                      console.log("data", data);
                      console.log("err", err);
                      console.log("error", error);

                      return setSubmitting(false);
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
                    <label>비밀번호</label>
                    <div className="form-group icon-input mb-1">
                      <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      />
                    </div>
                    <ErrorMessage name="password" component={"div"} />
                    <div className="form-check text-left mb-3">
                      {/* <input
                        type="checkbox"
                        className="form-check-input mt-2"
                        id="exampleCheck5"
                      /> */}
                      {/* <label className="form-check-label font-xsss text-grey-500">
                        Remember me
                      </label> */}
                      <a
                        href="/forgot"
                        className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                      >
                        비밀번호를 잊어버리셨어요?
                      </a>
                    </div>
                    <div className="col-sm-12 p-0 text-left">
                      <div className="form-group mb-1">
                        <button
                          type="submit"
                          className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                        >
                          로그인
                        </button>
                      </div>
                      <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                        아직 회원이 아니신가요?{" "}
                        <a href="/register" className="fw-700 ms-1">
                          회원가입
                        </a>
                      </h6>
                    </div>
                    <div className="col-sm-12 p-0 text-center mt-2">
                      <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                        간편로그인 하기{" "}
                      </h6>
                      <div className="form-group mb-1">
                        <a
                          href="/register"
                          className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
                        >
                          <img
                            src="assets/images/icon-1.png"
                            alt="icon"
                            className="ms-2 w40 mb-1 me-5"
                          />{" "}
                         구글 간편 로그인
                        </a>
                      </div>
                      <div className="form-group mb-1">
                        <a
                          href="/register"
                          className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                        >
                          <img
                            src="assets/images/icon-3.png"
                            alt="icon"
                            className="ms-2 w40 mb-1 me-5"
                          />{" "}
                         페이스북 간편 로그인
                        </a>
                      </div>
                    </div>
                    {/* <button type="submit" className="btn btn-primary mt-3">
                      <span>로그인</span>
                    </button> */}
                  </Form>
                </Formik>
                {/*
                <form>
                   <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0"></i>
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      type="Password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                  </div> */}
                {/* <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck5"
                    />
                    <label className="form-check-label font-xsss text-grey-500">
                      Remember me
                    </label>
                    <a
                      href="/forgot"
                      className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                    >
                      Forgot your Password?
                    </a>
                  </div> 
                </form>*/}
                {/* 
                <div className="col-sm-12 p-0 text-left">
                  <div className="form-group mb-1">
                    <a
                      href="/login"
                      className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                    >
                      Login
                    </a>
                  </div>
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Dont have account{" "}
                    <a href="/register" className="fw-700 ms-1">
                      Register
                    </a>
                  </h6>
                </div>
                <div className="col-sm-12 p-0 text-center mt-2">
                  <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">
                    Or, Sign in with your social account{" "}
                  </h6>
                  <div className="form-group mb-1">
                    <a
                      href="/register"
                      className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"
                    >
                      <img
                        src="assets/images/icon-1.png"
                        alt="icon"
                        className="ms-2 w40 mb-1 me-5"
                      />{" "}
                      Sign in with Google
                    </a>
                  </div>
                  <div className="form-group mb-1">
                    <a
                      href="/register"
                      className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                    >
                      <img
                        src="assets/images/icon-3.png"
                        alt="icon"
                        className="ms-2 w40 mb-1 me-5"
                      />{" "}
                      Sign in with Facebook
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
