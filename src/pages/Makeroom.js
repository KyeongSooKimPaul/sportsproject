import React, { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";

import Popupchat from "../components/Popupchat";
import { useQuery, gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
const MAKEROOM_MUTATION = gql`
  mutation createRoom(
    $userId: Int
    $offline: Int
    $title: String
    $subtitle: String
    $openingtime: String
    $groupcount: Int
    $photos: String
    $location: String
    $tags: String
    $active: Int
    $docsforactive: String
    $roommakerid: Int
  ) {
    createRoom(
      userId: $userId
      offline: $offline
      title: $title
      subtitle: $subtitle
      openingtime: $openingtime
      groupcount: $groupcount
      photos: $photos
      location: $location
      tags: $tags
      active: $active
      docsforactive: $docsforactive
      roommakerid: $roommakerid
    ) {
      id
    }
  }
`;

function Makeroom() {
  const [makeroom, { data, error }] = useMutation(MAKEROOM_MUTATION, {
    onCompleted({ data }) {
      if (data) {
        console.log("data", data);
        alert("방 생성이 완료되었습니다. 관리자가 승인할 때까지 기다려주세요");
      }
    },
    onError({ error }) {
      if (error) {
        console.log("error", error);
      }
    },
  });

  useEffect(() => {
    if (window.localStorage.getItem("userid")) {
      console.log(
        "window.localStorage.getItem()",
        window.localStorage.getItem("userid")
      );
    }
  }, []);

  const initialValues = {
    userId: Number(window.localStorage.getItem("userid")),
    offline: 1,
    title: "",
    subtitle: "",
    openingtime: "",
    groupcount: 15,
    photos: "photos",
    location: "",
    tags: "",
    active: 2,
    docsforactive: "docsforactive",
    roommakerid: Number(window.localStorage.getItem("userid")),
  };

  const validationSchema = Yup.object({
    offline: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    title: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    subtitle: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    openingtime: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    groupcount: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    location: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    tags: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
  });

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                  <div className="d-inline-block mt-2">
                    <i className="feather-bookmark me-2 font-sm text-white"></i>
                  </div>
                  <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    방 만들기
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <div className="row justify-content-center">
                    <div className="col-lg-4 text-center">
                      <figure className="avatar ms-auto me-auto mb-0 mt-2 w100">
                        <img
                          src="https://www.pinclipart.com/picdir/big/77-771471_winter-kids-clubs-and-childcare-kids-icon-clipart.png"
                          alt="avater"
                          className="shadow-sm rounded-3 w-100"
                        />
                      </figure>
                      <h2 className="fw-700 font-sm text-grey-900 mt-3">
                        쉽게 방을 만들어 보세요!
                      </h2>
                      <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">
                        아참, 방 생성 후 인증을 받아야 하는 것도 잊지 마세요!
                      </h4>
                    </div>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true);

                      try {
                        const response = await makeroom({
                          variables: values,
                        });
                        //   alert("반갑습니다");
                        console.log("data22", response);
                        if (response.data) {
                          alert(
                            "방 생성이 완료되었습니다. 관리자가 승인할 때까지 기다려주세요"
                          );
                        } else {
                          alert("입력정보를 다시 확인해주세요");
                        }
                        setSubmitting(false);
                        // alert(
                        //   "방 생성이 완료되었습니다. 관리자가 승인할 때까지 기다려주세요"
                        // );
                      } catch (err) {
                        alert("입력정보를 다시 확인해주세요");
                        console.log("data", data);
                        console.log("err", err);
                        console.log("error", error);

                        return setSubmitting(false);
                      }
                    }}
                  >
                    <div className="row">
                      <Form>
                        {" "}
                        <div className="col-lg-12 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss mb-2">
                              방 이름
                            </label>
                            <Field
                              name="title"
                              type="text"
                              placeholder="방 이름"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <ErrorMessage name="title" component={"div"} />
                        <div className="col-lg-12 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss mb-2">
                              서브타이틀
                            </label>

                            <Field
                              name="subtitle"
                              type="text"
                              placeholder="서브타이틀"
                              className="form-control"
                            />
                          </div>
                          <ErrorMessage name="subtitle" component={"div"} />
                        </div>
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                참여인원 수
                              </label>

                              <Field
                                name="groupcount"
                                type="text"
                                placeholder=" 참여인원 수"
                                className="form-control"
                              />
                            </div>{" "}
                            <ErrorMessage name="groupcount" component={"div"} />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                모임시간
                              </label>

                              <Field
                                name="openingtime"
                                type="text"
                                placeholder="모임시간"
                                className="form-control"
                              />
                            </div>{" "}
                            <ErrorMessage
                              name="openingtime"
                              component={"div"}
                            />
                          </div>{" "}
                        </div>{" "}
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                태그설정
                              </label>

                              <Field
                                name="tags"
                                type="text"
                                placeholder="태그설정"
                                className="form-control"
                              />
                            </div>{" "}
                            <ErrorMessage name="tags" component={"div"} />
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss mb-2">
                                모임장소
                              </label>

                              <Field
                                name="location"
                                type="text"
                                placeholder="모임장소"
                                className="form-control"
                              />
                            </div>{" "}
                            <ErrorMessage name="location" component={"div"} />
                          </div>{" "}
                        </div>
                        <div className="col-lg-12 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss mb-2">
                              온라인 / 오프라인
                            </label>

                            <Field
                              name="offline"
                              type="text"
                              placeholder="온라인 / 오프라인"
                              className="form-control"
                            />
                          </div>{" "}
                          <ErrorMessage name="offline" component={"div"} />
                        </div>
                        {/* <div className="col-lg-12 mb-3">
                          <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                            방 소개
                          </label>{" "}
                          <Field
                            name="offline"
                            type="textarea"
                            placeholder="방을 소개하는 글을 써 보세요!"
                            rows="5"
                            className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                          />
                
                        </div><ErrorMessage name="offline" component={"div"} />
                       */}
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                          >
                            방 만들기
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Formik>
                  {/* 
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            온라인 / 오프라인
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss mb-2">
                            Address
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>


                      <div className="col-lg-12 mb-3">
                        <div className="card mt-3 border-0">
                          <div className="card-body d-flex justify-content-between align-items-end p-0">
                            <div className="form-group mb-0 w-100">
                              <input
                                type="file"
                                name="file"
                                id="file"
                                className="input-file"
                              />
                              <label
                                htmlFor="file"
                                className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
                              >
                                <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                <span className="js-fileName">
                                  Drag and drop or click to replace
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div> 
                  
                      <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">
                          방 소개
                        </label>
                        <textarea
                          className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                          rows="5"
                          placeholder="방을 소개하는 글을 써 보세요!"
                        ></textarea>
                      </div> 
                
                      <div className="col-lg-12">
                        <a
                          href="/accountinformation"
                          className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                        >
                          방 만들기
                        </a>
                      </div>
                    </div>
                  </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popupchat />
    </Fragment>
  );
}

export default Makeroom;
