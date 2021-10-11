import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Slider from "react-slick";
import Popupchat from "../components/Popupchat";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Typewriter from "typewriter-effect";
import LeftArrow from "../../public/assets/images/left-arrow.svg";
import RightArrow from "../../public/assets/images/right-arrow.svg";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ROOMS_QUERY = gql`
  query rooms {
    rooms {
      id
      User {
        id
        name
        email
      }
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

const dataTop = [
  {
    url: "assets/sample1.jpeg",
  },
  {
    url: "assets/sample2.png",
  },
  { url: "assets/sample3.jpeg" },
  {
    url: "assets/sample4.jpeg",
  },
];

const eventList = [
  {
    imageUrl: "hotel.png",
    title: `Running Monday!`,
    subtitle: `달리는 주린이들!`,
    location: "Goa, Mumbai",
    date: "22",
    month: "FEB",
  },
  {
    imageUrl: "hotel.png",
    title: `탄천에서 1시간 러닝!`,
    subtitle: `+) 분당 직장 러너들 모여요`,
    location: "Goa, Mumbai",
    date: "22",
    month: "FEB",
  },
  {
    imageUrl: "hotel.png",
    title: `헬린이들의 수다 러닝!`,
    subtitle: `+) 만년 다이어터들 모여요`,
    location: "Goa, Mumbai",
    date: "22",
    month: "FEB",
  },
  {
    imageUrl: "hotel.png",
    title: `한강 라이더 모임`,
    subtitle: `3시간 라이딩 예정입니다`,
    location: "Goa, Mumbai",
    date: "31",
    month: "APR",
  },
];

function Event() {
  const sliderstyle = {
    paddingRight: 20 + "!important",
  };
  const shopsettings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
  };

  const [roomsdata, setroomsdata] = useState([]);
  const { data: data1, error: error1 } = useQuery(ROOMS_QUERY, {
    onCompleted: (data1) => {
      console.log("dd", data1.rooms);
      return setroomsdata(data1.rooms);
    },
    onError: (error1) =>
      console.log("error1!------------", console.log(error1)),
  });

  const clickroomhandler = () => {
    return (window.location.href = "/makeroom");
  };
  const clickroomjoinhandler = () => {
    return (window.location.href = "/singleproduct");
  };

  return (
    <Fragment>
      <Fab
        size="medium"
        color="primary"
        aria-label="add"
        style={{
          zIndex: "1000",
          backgroundColor: "#67bdeb !important",
          left: "50%",
          top: "85%",
          position: "fixed",
          width: "120px",
          borderRadius: "40px",
        }}
        onClick={clickroomhandler}
      >
        <AddIcon /> 방 만들기
      </Fab>
      <Header />
      <Leftnav />
      <Rightchat />
      <div className="main-content bg-white right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left">
            <div className="row">
              <div className="col-xl-12 col-xxl-12 col-lg-12">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="banner-wrapper bg-greylight overflow-hidden rounded-3 shop-slider">
                      <Slider {...shopsettings}>
                        <div className="style1 d-flex align-items-center bg-lightblue">
                          <div className="row">
                            <div
                              className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4"
                              style={sliderstyle}
                            >
                              <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                <h4 className="font-xssss text-danger ls-3 fw-700 ms-0 mt-4 mb-3">
                                  TRENDING
                                </h4>
                                <h2 className="fw-300 display1-size display2-md-size lh-2 text-grey-900">
                                  새로운 사람들과 <br />{" "}
                                  <b className="fw-700">함께 달려보세요</b>
                                </h2>
                                <p className="fw-500 text-grey-500 lh-26 font-xssss pe-lg-5">
                                  새로운 사람들과 알아가면서, 건강도 챙겨보세요
                                  :) <br />
                                  매일이 새로운 그곳, 여기에 있습니다 <br />{" "}
                                  <br />
                                </p>
                                <a
                                  href="/singleproduct"
                                  className="fw-700 text-white rounded-xl bg-primary-gradiant font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
                                >
                                  Join Now
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <img
                                src="assets/sample2.png"
                                alt="product"
                                className="img-fluid p-md-5 p-4"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="style1 d-flex align-items-center bg-cyan">
                          <div className="row">
                            <div
                              className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4"
                              style={sliderstyle}
                            >
                              <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                                <h4 className="font-xssss text-white ls-3 fw-700 ms-0 mt-4 mb-3">
                                  New
                                </h4>
                                <h2 className="fw-300 display1-size display2-md-size lh-2 text-white">
                                  혼자서 하는 고민은 <br />{" "}
                                  <b className="fw-700">이제 그만!</b>
                                </h2>
                                <p className="fw-500 text-grey-100 lh-26 font-xssss pe-lg-5">
                                  소통하고 싶어하는 사람들과 자유롭게
                                  대화해보세요. 다양한 온오프라인이 있는 곳에서
                                  여러분의 발전을 도모해보세요. 여러분을 항상
                                  응원합니다:)
                                </p>
                                <a
                                  href="/singleproduct"
                                  className="fw-700 text-grey-900 rounded-xl bg-white font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
                                >
                                  Join Now
                                </a>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <img
                                src="assets/sample1.jpeg"
                                alt="product"
                                className="img-fluid p-md-5 p-4"
                              />
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>

                  {roomsdata &&
                    roomsdata.map((value, index) => (
                      <div
                        key={index}
                        className="col-lg-4 col-md-6 pe-2 ps-2"
                        // onClick={clickroomjoinhandler}
                      >
                        <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                          {/* <Link
                        to={{
                          pathname: `/singleproduct?${String(value.id)}`,
                          aboutprops: { value: `${value.id}` },
                        }}
                      > */}
                          <Link to={`/singleproduct?${value.id}`}>
                            <div className="card-body d-flex ps-0 pe-0 pb-0">
                              <h2
                                className="fw-500 lh-3 font-xss"
                                style={{ width: "70%" }}
                              >
                                {value.title}

                                <span
                                  className="d-flex  fw-4
                          00 mt-1 lh-3 "
                                >
                                  {" "}
                                  {value.subtitle}{" "}
                                </span>
                                <span
                                  className="d-flex font-xssss fw-4
                          00 mt-2 lh-3 "
                                  style={{ color: "#5eb4e6" }}
                                >
                                  {" "}
                                  <i className="ti-location-pin me-1"></i>
                                  9월 27일 오전 12시부터{" "}
                                </span>
                              </h2>
                              <div
                                className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg"
                                style={{ width: "30%", textAlign: "center" }}
                              >
                                <img
                                  src="assets/images/runningexam.jpg"
                                  alt="user"
                                  className="w30 d-inline-block"
                                />
                                {/* <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
                          <span className="ls-3 d-block font-xsss text-grey-500 fw-500">
                            {value.month}
                          </span>
                          {value.date}
                        </h4> */}
                              </div>
                            </div>{" "}
                          </Link>
                          <div className="card-body p-0">
                            <ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
                              <li>
                                <a href="/defaultevent">
                                  <img
                                    src="assets/images/userexam.png"
                                    alt="user"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/defaultevent">
                                  <img
                                    src="assets/images/userexam.png"
                                    alt="user"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/defaultevent">
                                  <img
                                    src="assets/images/userexam.png"
                                    alt="user"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li>
                                <a href="/defaultevent">
                                  <img
                                    src="assets/images/userexam.png"
                                    alt="user"
                                    className="w30 d-inline-block"
                                  />
                                </a>
                              </li>
                              <li className="last-member">
                                <a
                                  href="/defaultevent"
                                  className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center"
                                >
                                  +2
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default Event;

// import React, { Fragment, useEffect, useState } from "react";
// import Header from "../components/Header";
// import Leftnav from "../components/Leftnav";
// import Rightchat from "../components/Rightchat";
// import Slider from "react-slick";
// import Popupchat from "../components/Popupchat";
// import { Link } from "react-router-dom";
// import GoogleMapReact from "google-map-react";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";
// import * as Yup from "yup";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import Typewriter from "typewriter-effect";
// import LeftArrow from "../../public/assets/images/left-arrow.svg";
// import RightArrow from "../../public/assets/images/right-arrow.svg";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const ROOMS_QUERY = gql`
//   query rooms {
//     rooms {
//       id
//       User {
//         id
//         name
//         email
//       }
//       offline
//       title
//       subtitle
//       openingtime
//       groupcount
//       createdAt
//       photos
//       location
//       tags
//       active
//       docsforactive
//       roommakerid
//     }
//   }
// `;

// const data = [
//   {
//     title: "BACKPACKING TRIPS",
//     url: "https://www.wanderon.in/svg/backpacking-trips.svg",
//   },
//   {
//     title: "WEEKEND TRIPS",
//     url: "https://www.wanderon.in/svg/weekend-trips.svg",
//   },
//   {
//     title: "WORKCATIONS STAYS",
//     url: "https://www.wanderon.in/svg/workcations.svg",
//   },
//   { title: "ADVENTURE COURSES", url: "https://www.wanderon.in/svg/scuba.svg" },
//   {
//     title: "CUSTOMISED TRIPS",
//     url: "https://www.wanderon.in/svg/customised-trips.svg",
//   },
//   {
//     title: "CORPORATE TRIPS",
//     url: "https://www.wanderon.in/svg/corporate-trips.svg",
//   },
// ];

// const dataBanner = [
//   {
//     title: "Happy Travellers",
//     url: "https://www.wanderon.in/svg/cover-travellers.svg",
//   },
//   {
//     title: "5 Star Ratings",
//     url: "https://www.wanderon.in/svg/cover-star.svg",
//   },
//   {
//     title: "Itineraries",
//     url: "https://www.wanderon.in/svg/cover-destination.svg",
//   },
// ];

// const dataForBackPacking = [
//   { url: "https://www.wanderon.in/triplist/bir-billing/wanderon-bir-1.jpg" },
//   {
//     url: "https://www.wanderon.in/triplist/manali-lahaul/wanderon-manali-1.jpg",
//   },
//   {
//     url: "https://www.wanderon.in/triplist/kasol-kheerganga/wanderon-kasol-1.jpg",
//   },
//   {
//     url: "https://www.wanderon.in/triplist/tirthan-valley/wanderon-tirthan-1.jpg",
//   },
//   {
//     url: "https://www.wanderon.in/triplist/chopta-tungnath/wanderon-chopta-1.jpg",
//   },
//   {
//     url: "https://www.wanderon.in/triplist/mcleodganj-bir-billing/wanderon-bir-1.jpg",
//   },
// ];

// const dataTop = [
//   {
//     url: "assets/sample1.jpeg",
//   },
//   {
//     url: "assets/sample2.png",
//   },
//   {    url: "assets/sample3.jpeg", },
//   {
//     url: "assets/sample4.jpeg",
//   },

// ];

// const eventList = [
//   {
//     imageUrl: "hotel.png",
//     title: `Running Monday!`,
//     subtitle: `달리는 주린이들!`,
//     location: "Goa, Mumbai",
//     date: "22",
//     month: "FEB",
//   },
//   {
//     imageUrl: "hotel.png",
//     title: `탄천에서 1시간 러닝!`,
//     subtitle: `+) 분당 직장 러너들 모여요`,
//     location: "Goa, Mumbai",
//     date: "22",
//     month: "FEB",
//   },
//   {
//     imageUrl: "hotel.png",
//     title: `헬린이들의 수다 러닝!`,
//     subtitle: `+) 만년 다이어터들 모여요`,
//     location: "Goa, Mumbai",
//     date: "22",
//     month: "FEB",
//   },
//   {
//     imageUrl: "hotel.png",
//     title: `한강 라이더 모임`,
//     subtitle: `3시간 라이딩 예정입니다`,
//     location: "Goa, Mumbai",
//     date: "31",
//     month: "APR",
//   },
// ];

// function Event() {
//   const sliderstyle = {
//     paddingRight: 20 + "!important",
//   };
//   const shopsettings = {
//     arrows: true,
//     dots: true,
//     infinite: false,
//     speed: 300,
//     slidesToShow: 1,
//     centerMode: false,
//   };
//   // const settings = {
//   //   dots: false,
//   //   infinite: false,
//   //   speed: 500,
//   //   slidesToShow: 1,
//   //   slidesToScroll: 1,
//   //   // initialSlide: 0,
//   //   nextArrow: (
//   //     <img
//   //       style={{
//   //         top: "15% !important",
//   //         left: "8% !important",
//   //         width: "70px !important",
//   //         height: "70px !important",
//   //       }}
//   //       src="https://img.icons8.com/color/96/000000/circled-left-2--v1.png"
//   //     />
//   //   ),
//   //   prevArrow: (
//   //     <img
//   //       style={{
//   //         top: "20%",
//   //         left: "8%",
//   //         width: "70px",
//   //         height: "70px",
//   //       }}
//   //       src="https://img.icons8.com/color/96/000000/circled-right-2--v1.png"
//   //     />
//   //   ),
//   // };

//   var defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33,
//     },
//     zoom: 11,
//   };
//   const [roomsdata, setroomsdata] = useState([]);
//   const { data: data1, error: error1 } = useQuery(ROOMS_QUERY, {
//     onCompleted: (data1) => {
//       console.log("dd", data1.rooms);
//       return setroomsdata(data1.rooms);
//     },
//     onError: (error1) =>
//       console.log("error1!------------", console.log(error1)),
//   });

//   const clickroomhandler = () => {
//     return (window.location.href = "/makeroom");
//   };
//   const clickroomjoinhandler = () => {
//     return (window.location.href = "/singleproduct");
//   };

//   return (
//     <Fragment>
//       <Fab
//         size="medium"
//         color="secondary"
//         aria-label="add"
//         style={{
//           zIndex: "1000",
//           left: "50%",
//           top: "85%",
//           position: "fixed",
//           width: "120px",
//           borderRadius: "40px",
//         }}
//         onClick={clickroomhandler}
//       >
//         <AddIcon /> 방 만들기
//       </Fab>
//       <Header />
//       <Leftnav />
//       <Rightchat />

//       <div className="main-content right-chat-active">
//         <div className="middle-sidebar-bottom">
//           <div className="middle-sidebar-left pe-0">
//             <div className="row">
//               <div className="col-xl-12">
//                 <div className="card w-100 border-0 shadow-none rounded-xxl border-0 mb-3 overflow-hidden ">
//                   <div style={{ height: "400px", width: "100%" }}>
//                     <div>
//                       <h1>join the community</h1>
//                       <Slider {...shopsettings}>
//                         <div className="style1 d-flex align-items-center bg-lightblue">
//                           <div className="row">
//                             <div
//                               className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4"
//                               style={sliderstyle}
//                             >
//                               <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
//                                 <h4 className="font-xssss text-danger ls-3 fw-700 ms-0 mt-4 mb-3">
//                                   TRENDING
//                                 </h4>
//                                 <h2 className="fw-300 display1-size display2-md-size lh-2 text-grey-900">
//                                   New Arrival Buds <br />{" "}
//                                   <b className="fw-700">Collection</b>
//                                 </h2>
//                                 <p className="fw-500 text-grey-500 lh-26 font-xssss pe-lg-5">
//                                   Lorem ipsum dolor sit amet, consectetur
//                                   adipiscing elit. Morbi nulla dolor, ornare at
//                                   commodo non, feugiat non nisi. Phasellus
//                                   faucibus mollis pharetra.
//                                 </p>
//                                 <a
//                                   href="/singleproduct"
//                                   className="fw-700 text-white rounded-xl bg-primary-gradiant font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
//                                 >
//                                   Shop Now
//                                 </a>
//                               </div>
//                             </div>
//                             <div className="col-lg-6">
//                               <img
//                                 src="assets/images/product.png"
//                                 alt="product"
//                                 className="img-fluid p-md-5 p-4"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="style1 d-flex align-items-center bg-cyan">
//                           <div className="row">
//                             <div
//                               className="col-lg-6 ps-0 p-lg-5 pe-2 ps-5 pt-4"
//                               style={sliderstyle}
//                             >
//                               <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
//                                 <h4 className="font-xssss text-white ls-3 fw-700 ms-0 mt-4 mb-3">
//                                   TRENDING
//                                 </h4>
//                                 <h2 className="fw-300 display1-size display2-md-size lh-2 text-white">
//                                   New Arrival Buds <br />{" "}
//                                   <b className="fw-700">Collection</b>
//                                 </h2>
//                                 <p className="fw-500 text-grey-100 lh-26 font-xssss pe-lg-5">
//                                   Lorem ipsum dolor sit amet, consectetur
//                                   adipiscing elit. Morbi nulla dolor, ornare at
//                                   commodo non, feugiat non nisi. Phasellus
//                                   faucibus mollis pharetra.
//                                 </p>
//                                 <a
//                                   href="/singleproduct"
//                                   className="fw-700 text-grey-900 rounded-xl bg-white font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
//                                 >
//                                   Shop Now
//                                 </a>
//                               </div>
//                             </div>
//                             <div className="col-lg-6">
//                               <img
//                                 src="assets/images/product.png"
//                                 alt="product"
//                                 className="img-fluid p-md-5 p-4"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </Slider>
//                       {/* <Slider {...settings}>
//                         {dataTop &&
//                           dataTop.map((item, index) => {
//                             return (
//                               <div key={index}>
//                                 <img src={item.url} alt="hero_img" />
//                               </div>
//                             );
//                           })}
//                       </Slider> */}
//                     </div>

//                     {/* <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div> */}
//                   </div>
//                 </div>
//               </div>

//               {roomsdata &&
//                 roomsdata.map((value, index) => (
//                   <div
//                     key={index}
//                     className="col-lg-4 col-md-6 pe-2 ps-2"
//                     // onClick={clickroomjoinhandler}
//                   >
//                     <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
//                       {/* <Link
//                         to={{
//                           pathname: `/singleproduct?${String(value.id)}`,
//                           aboutprops: { value: `${value.id}` },
//                         }}
//                       > */}
//                       <Link to={`/singleproduct?${value.id}`}>
//                         <div className="card-body d-flex ps-0 pe-0 pb-0">
//                           <h2
//                             className="fw-500 lh-3 font-xss"
//                             style={{ width: "70%" }}
//                           >
//                             {value.title}

//                             <span
//                               className="d-flex  fw-4
//                           00 mt-1 lh-3 "
//                             >
//                               {" "}
//                               {value.subtitle}{" "}
//                             </span>
//                             <span
//                               className="d-flex font-xssss fw-4
//                           00 mt-2 lh-3 "
//                               style={{ color: "#5eb4e6" }}
//                             >
//                               {" "}
//                               <i className="ti-location-pin me-1"></i>
//                               9월 27일 오전 12시부터{" "}
//                             </span>
//                           </h2>
//                           <div
//                             className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg"
//                             style={{ width: "30%", textAlign: "center" }}
//                           >
//                             <img
//                               src="assets/images/runningexam.jpg"
//                               alt="user"
//                               className="w30 d-inline-block"
//                             />
//                             {/* <h4 className="fw-700 font-lg ls-3 text-grey-900 mb-0">
//                           <span className="ls-3 d-block font-xsss text-grey-500 fw-500">
//                             {value.month}
//                           </span>
//                           {value.date}
//                         </h4> */}
//                           </div>
//                         </div>{" "}
//                       </Link>
//                       <div className="card-body p-0">
//                         <ul className="memberlist mt-4 mb-2 ms-0 d-inline-block">
//                           <li>
//                             <a href="/defaultevent">
//                               <img
//                                 src="assets/images/userexam.png"
//                                 alt="user"
//                                 className="w30 d-inline-block"
//                               />
//                             </a>
//                           </li>
//                           <li>
//                             <a href="/defaultevent">
//                               <img
//                                 src="assets/images/userexam.png"
//                                 alt="user"
//                                 className="w30 d-inline-block"
//                               />
//                             </a>
//                           </li>
//                           <li>
//                             <a href="/defaultevent">
//                               <img
//                                 src="assets/images/userexam.png"
//                                 alt="user"
//                                 className="w30 d-inline-block"
//                               />
//                             </a>
//                           </li>
//                           <li>
//                             <a href="/defaultevent">
//                               <img
//                                 src="assets/images/userexam.png"
//                                 alt="user"
//                                 className="w30 d-inline-block"
//                               />
//                             </a>
//                           </li>
//                           <li className="last-member">
//                             <a
//                               href="/defaultevent"
//                               className="bg-greylight fw-600 text-grey-500 font-xssss ls-3 text-center"
//                             >
//                               +2
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <Popupchat />
//     </Fragment>
//   );
// }

// export default Event;
