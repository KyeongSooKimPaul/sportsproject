import React, { Fragment } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Slider from "react-slick";
import Popupchat from "../components/Popupchat";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
  var defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div className="middle-sidebar-left pe-0">
            <div className="row">
              <div className="col-xl-12">
                <div className="card w-100 border-0 shadow-none rounded-xxl border-0 mb-3 overflow-hidden ">
                  <div style={{ height: "400px", width: "100%" }}>
                    <GoogleMapReact
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                      />
                    </GoogleMapReact>
                  </div>
                </div>
              </div>

              {eventList.map((value, index) => (
                <div key={index} className="col-lg-4 col-md-6 pe-2 ps-2">
                  <div className="card p-3 bg-white w-100 hover-card border-0 shadow-xss rounded-xxl border-0 mb-3 overflow-hidden ">
                    <div className="card-body d-flex ps-0 pe-0 pb-0">
                      <h2 className="fw-500 lh-3 font-xss" style={{width:"70%"}}>
                    {value.title} 
                     
                       <span
                          className="d-flex  fw-4
                          00 mt-1 lh-3 "
                   
                        >
                          {" "}
                      
                          {value.subtitle} {" "}
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
                      <div className="bg-greylight me-3 p-3 border-light-md rounded-xxl theme-dark-bg"style={{width:"30%", textAlign:"center"}}>
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
                    </div>
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

      <Popupchat />
    </Fragment>
  );
}

export default Event;
