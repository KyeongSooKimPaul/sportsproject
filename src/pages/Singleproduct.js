import React, { Fragment, useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import { useLocation } from "react-router-dom";
import Popupchat from "../components/Popupchat";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";

import Slider from "react-slick";


const ROOMS1_QUERY = gql`
  query roomsbyid($id: Int!) {
    query(id: $id) {
      offline
      title
      subtitle
      openingtime
      groupcount
      createdAt
      photos
      location
      tags
      active
      docsforactive
      roommakerid
    }
  }
`;

const ROOMS_QUERY = gql`
  mutation roomsbyid($id: Int!) {
    mutation(id: $id) {
      offline
      title
      subtitle
      openingtime
      groupcount
      createdAt
      photos
      location
      tags
      active
      docsforactive
      roommakerid
    }
  }
`;



const slideList = [
  {
    imageUrl: "product.png",
    name: "product-image ",
  },
  {
    imageUrl: "product.png",
    name: "product-image ",
  },
  {
    imageUrl: "product.png",
    name: "product-image ",
  },
  {
    imageUrl: "product.png",
    name: "product-image ",
  },
];

function Singleproduct(match) {
  console.log("from2", match.location.search.length);
  const hotelsettings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    variableWidth: false,
  };
  const [roomsdata, setroomsdata] = useState([]);
  const [roomsmutation, { data, error }] = useMutation(ROOMS_QUERY, {
    onCompleted: (data) => {
      console.log("data11", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const { data: data1, error: error1 } = useQuery(ROOMS1_QUERY, {
    variables: { id: 2 },
    onCompleted: (data1) => {
      console.log("dd", data1.rooms);
      return setroomsdata(data1.rooms);
    },
    onError: (error1) =>
      console.log("error1!------------", console.log(error1)),
  });

  useMemo(() => {
    console.log("dd2");
    if (match.location.search.length > 0) {
      console.log("dd", Number(match.location.search.substr(1)));
      roomsmutation({
        variables: { id: 2 },
      });
    }
    // returned function will be called on component unmount
    // return () => {
    //   window.removeEventListener("resize", updateDimensions.bind(this));
    // };
  }, [match]);
  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />
      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-lg-1  p-0 d-none d-lg-block">
                <img
                  src="https://via.placeholder.com/385x300.png"
                  alt="product"
                  className="mb-2 w-100 bg-white p-3"
                />
                <img
                  src="https://via.placeholder.com/385x300.png"
                  alt="product"
                  className="mb-2 w-100 bg-white p-3"
                />
                <img
                  src="https://via.placeholder.com/385x300.png"
                  alt="product"
                  className="mb-2 w-100 bg-white p-3"
                />
                <img
                  src="https://via.placeholder.com/385x300.png"
                  alt="product"
                  className="mb-2 w-100 bg-white p-3"
                />
              </div>
              <div className="col-lg-5 mb-4 shop-slider">
                <Slider {...hotelsettings}>
                  {slideList.map((value, index) => (
                    <div
                      key={index}
                      className="pt-lg--5 pb-lg--10 bg-white rounded-3"
                    >
                      <img
                        src={`assets/images/${value.imageUrl}`}
                        alt="avater"
                        className="rounded-3 img-fluid"
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="col-lg-6  col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                <h4 className="text-danger font-xssss fw-700 ls-2">오프라인</h4>
                <h4 className="fw-700 text-grey-900 display1-size lh-4 porduct-title">
                  {" "}
                  탄천에서 달리기하실 주린이 모집!
                </h4>
                <div className="star d-block w-100 text-left">
                  <img
                    src="assets/images/star.png"
                    alt="star"
                    className="w15 float-left"
                  />
                  <img
                    src="assets/images/star.png"
                    alt="star"
                    className="w15 float-left"
                  />
                  <img
                    src="assets/images/star.png"
                    alt="star"
                    className="w15 float-left"
                  />
                  <img
                    src="assets/images/star.png"
                    alt="star"
                    className="w15 float-left"
                  />
                  <img
                    src="assets/images/star-disable.png"
                    alt="star"
                    className="w15 float-left me-2"
                  />
                </div>
                <p className="review-link font-xssss fw-500 text-grey-500 lh-3">
                  {" "}
                  2 customer review
                </p>
                <div className="clearfix"></div>
                <p className="font-xsss fw-400 text-grey-500 lh-30 pe-4 mt-3 me-5">
                  탄천에서 같이 달리기 하실 주린이 분들 모집합니다! <br />
                  코로나 방역수칙에 따라 마스크 지참 부탁드립니다!
                </p>

                {/* <h6 className="display2-size fw-700 text-current ls-2 mb-2">
                  <span className="font-xl">$</span>449{" "}
                  <span
                    className="font-xs text-grey-500"
                    style={{ textDecoration: `line-through` }}
                  >
                    $699
                  </span>
                </h6> */}
                <div className="timer bg-white mt-2 mb-0 w350 rounded-3">
                  <div className="time-count">
                    <span className="text-time">03</span>{" "}
                    <span className="text-day">Day</span>
                  </div>{" "}
                  <div className="time-count">
                    <span className="text-time">03</span>{" "}
                    <span className="text-day">Hours</span>{" "}
                  </div>{" "}
                  <div className="time-count">
                    <span className="text-time">55</span>{" "}
                    <span className="text-day">Min</span>{" "}
                  </div>{" "}
                  <div className="time-count">
                    <span className="text-time">48</span>{" "}
                    <span className="text-day">Sec</span>{" "}
                  </div>{" "}
                </div>
                <div className="clearfix"></div>
                <form action="#" className="form--action mt-4 mb-3">
                  <div className="product-action flex-row align-items-center">
                    {/* <div className="quantity me-3">
                      <input
                        type="number"
                        className="quantity-input"
                        name="qty"
                        id="qty"
                        min="1"
                      />
                      <div className="dec qtybutton">-</div>
                      <div className="inc qtybutton">+</div>
                    </div> */}

                    <a
                      href="/defaulthoteldetails"
                      style={{width:"70% !important"}}
                      className="add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3"
                    >
                      참여하기
                    </a>
                    {/* <a
                      href="/defaulthoteldetails"
                      className="btn-round-xl alert-dark text-white d-inline-block mt-0 ms-4 float-left"
                    >
                      <i className="ti-heart font-sm"></i>
                    </a> */}
                  </div>
                </form>
                <div className="clearfix"></div>
                <ul className="product-feature-list mt-5">
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    <b className="text-grey-900"> Category : </b>Furniture
                  </li>
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    Straight fit
                  </li>
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    <b className="text-grey-900">SKU : </b> REF. LA-107
                  </li>
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    Dry clean
                  </li>
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    <b className="text-grey-900">Tags : </b>Design, Toys
                  </li>
                  <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                    Cutton shirt
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popupchat />
    </Fragment>
  );
}

export default Singleproduct;
