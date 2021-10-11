import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import Pagetitle from "../components/Pagetitle";
import { Link, NavLink } from "react-router-dom";
import Popupchat from "../components/Popupchat";
import { gql, useMutation, useQuery } from "@apollo/client";

const ROOMS_QUERY = gql`
  query users {
    users {
      id
      name
      email
      Profile {
        hobby
        photos
      }
    }
  }
`;

const FRIENDLIST_QUERY = gql`
  query user($id: Int!) {
    user(id: $id) {
      id
      name
      userinfo {
        id
        firendid
        frindinfo {
          name
          id
          email
        }
      }
    }
  }
`;

const CHAT_STARTED = gql`
  mutation updateFriendlist($id: Int!, $chatstarted: Int!) {
    updateFriendlist(chatstarted: $chatstarted) {
      id
    }
  }
`;

const QUERY_CHATPARTNER = gql`
  query Friendlistbyid($userid: Int!, $firendid: Int!) {
    Friendlistbyid(chatstarted: $chatstarted) {
      id
    }
  }
`;

console.log("22", window.localStorage.getItem("userid"));

const memberList = [
  {
    imageUrl: "user.png",
    name: "Victor Exrixon ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Surfiya Zakir ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Goria Coast ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Hurin Seary ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Victor Exrixon ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Surfiya Zakir ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Goria Coast ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Hurin Seary ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Surfiya Zakir ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Goria Coast ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Hurin Seary ",
    user: "@macale343",
  },
  {
    imageUrl: "user.png",
    name: "Aliqa Macale ",
    user: "@macale343",
  },
];

function Friendslist() {
  const [roomsdata, setroomsdata] = useState([]);
  const [friendlist, setfriendlist] = useState([]);
  useEffect(() => {
    if (friendlist) {
      console.log("friendlist", friendlist);
      console.log(
        "window.localStorage.getItem(",
        window.localStorage.getItem("userid")
      );
    }
  }, [friendlist]);

  const handlechatstarted = (param) => {
    console.log("param", param);
  };

  const [startchat, { data: data2, error: error2 }] = useMutation(
    CHAT_STARTED,
    {
      onCompleted({ data2 }) {
        if (data2) {
          console.log("data11", data1);
        }
      },
      onError({ error2 }) {
        if (error2) {
          console.log("error", error2);
        }
      },
    }
  );

  const { data, error } = useQuery(FRIENDLIST_QUERY, {
    variables: { id: Number(window.localStorage.getItem("userid")) },
    onCompleted: (data) => {
      console.log("dd88", data);
      return setfriendlist(data.user.userinfo);
    },
    onError: (error) => console.log("error!------------", console.log(error)),
  });

  const { data: data1, error: error1 } = useQuery(ROOMS_QUERY, {
    onCompleted: (data1) => {
      console.log("dd", data1);
      return setroomsdata(data1.users);
    },
    onError: (error1) =>
      console.log("error1!------------", console.log(error1)),
  });

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
                <Pagetitle title="Member" />
                <div className="row ps-2 pe-2">
                  <h4>친구신청이 들어왔어요</h4>
                  {roomsdata &&
                    roomsdata.map((value, index) => (
                      <div key={index} className="col-md-3 col-sm-4 pe-2 ps-2">
                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                          <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                              <img
                                src={`assets/images/${value.imageUrl}`}
                                alt="avater"
                                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                              />
                            </figure>
                            <div className="clearfix w-100"></div>
                            <h4 className="fw-700 font-xsss mt-3 mb-0">
                              {value.name}{" "}
                            </h4>
                            <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                              {value.user}
                            </p>
                            <a
                              href="/defaultmember"
                              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                            >
                              수락하기
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row ps-2 pe-2">
                  <h4>친구 목록</h4>
                  {friendlist &&
                    friendlist.map((value, index) => (
                      <div key={index} className="col-md-3 col-sm-4 pe-2 ps-2">
                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                          <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                            <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                              <img
                                src={`assets/images/${value.imageUrl}`}
                                alt="avater"
                                className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                              />
                            </figure>
                            {console.log("value", value)}
                            <div className="clearfix w-100"></div>
                            <h4 className="fw-700 font-xsss mt-3 mb-0">
                              {value.frindinfo.name}{" "}
                            </h4>
                            <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                              {value.user}
                            </p>
                            {/* <button
                              onClick={() =>
                                handlechatstarted(value.frindinfo.id)
                              }
                              // href="/defaultmessage"
                              className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                            >
                              대화하기
                            </button> */}
                            <Link
                             className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                              to={{
                                pathname: "/defaultmessage",
                                state: {
                                  fromNotifications: value.frindinfo.id,
                                },
                              }}
                            >
                              대화하기
                            </Link>
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

export default Friendslist;
