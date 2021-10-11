import React, { Fragment, useState, useEffect, useRef, useMemo } from "react";
import Header from "../components/Header";
import Leftnav from "../components/Leftnav";
import Rightchat from "../components/Rightchat";
import { Card, Row, Col, Button } from "react-bootstrap";

import { useQuery, useMutation, gql } from "@apollo/client";
import ReactScrollableFeed from "react-scrollable-feed";
import Popupchat from "../components/Popupchat";
var newdata = [];
var origin = [];

const CHAT_CREATE = gql`
  mutation createChat($receiverId: Int!, $senderId: Int!, $message: String!) {
    createChat(
      receiverId: $receiverId
      senderId: $senderId
      message: $message
    ) {
      id
    }
  }
`;

const CHAT_QUERY = gql`
  query chatmantoman2($receiverId: Int!, $senderId: Int!) {
    chatmantoman2(receiverId: $receiverId, senderId: $senderId) {
      id
      message
      createdAt
      updatedAt
      senderId
      receiverId
      receiver {
        name
      }
      sender {
        name
      }
    }
  }
`;

const newChat = gql`
  subscription Chat($receiverId: Int!, $senderId: Int!) {
    Chat(receiverId: $receiverId, senderId: $senderId) {
      message {
        id
        createdAt
        message
        updatedAt
        senderId
        receiverId
        receiver {
          name
        }
        sender {
          name
        }
      }
    }
  }
`;

function Chat(props) {
  console.log("props", props.location.state.fromNotifications);

  const [messagelogs, setmessagelogs] = useState([]);
  const [message, setMessage] = useState("");

  const myRef = useRef(null);
  useEffect(() => {
    // if (myRef) {
    //   return myRef?.current?.scrollIntoView();
    // }
    return myRef?.current?.scrollIntoView();
  }, [messagelogs]);

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(CHAT_QUERY, {
    variables: {
      // senderId: 1,
      // receiverId: 2,
      senderId: Number(window.localStorage.getItem("userid")),
      receiverId: props.location.state.fromNotifications,
    },
    onCompleted: (data2) => {
      if (data2) {
        console.log("data2", data2.chatmantoman2);
        return setmessagelogs(data2.chatmantoman2);
      }
    },
    onError: (error2) => {
      if (error2) {
        console.log("error", error2);
      }
    },
  });

  const [createChat, { data: data1, error: error1 }] = useMutation(
    CHAT_CREATE,
    {
      onCompleted({ data1 }) {
        if (data1) {
          console.log("data11", data1);
        }
      },
      onError({ error1 }) {
        if (error1) {
          console.log("error", error1);
        }
      },
    }
  );

  const { subscribeToMore, data, loading } = useQuery(CHAT_QUERY, {
    variables: {
      senderId: Number(window.localStorage.getItem("userid")),
      receiverId: props.location.state.fromNotifications,
    },
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

  useEffect(() => {
    subscribeToMore({
      document: newChat,
      variables: {
        senderId: Number(window.localStorage.getItem("userid")),
        receiverId: props.location.state.fromNotifications,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          console.log("11", subscriptionData);
          return prev.chatmantoman2;
        }
        const newMessage = subscriptionData.data.Chat.message;
        console.log("21", subscriptionData.data.Chat.message);
        console.log("21prev", prev);

        if (subscriptionData.data) {
          origin = [];
          newdata = newdata.concat(newMessage);
          console.log("newnew", newdata);
          var array = [
            ...prev.chatmantoman2,
            subscriptionData.data.Chat.message,
          ];
          var array = [...prev.chatmantoman2, ...newdata];

          //   console.log("21prev21prev----", [ subscriptionData.data.Chat]);
          //   console.log("21prev21prev", [...prev.chatmantoman, subscriptionData.data.Chat.message]);
          return setmessagelogs(array);
        }
      },
    });
  }, []);
  useEffect(() => {
    console.log("message", data2);
  }, [data2]);

  useEffect(() => {
    console.log("messagelogs", messagelogs);
  }, [messagelogs]);

  return (
    <Fragment>
      <Header />
      <Leftnav />
      <Rightchat />

      <div className="main-content right-chat-active">
        <div className="middle-sidebar-bottom">
          <div
            className="middle-sidebar-left pe-0"
            style={{ maxWidth: "100%" }}
          >
            <div className="row">
              <div className="col-lg-12 position-relative">
                <div className="chat-wrapper pt-0 w-100 position-relative scroll-bar bg-white theme-dark-bg">
                  <div className="chat-body p-3 ">
                    <div
                      className="messages-content pb-5"
                      style={{ overflowY: "scroll !important" }}
                    >
                   
                        {messagelogs &&
                          messagelogs.map((value, index) => (
                            <React.Fragment key={index}>
                              {value.senderId ==
                              window.localStorage.getItem("userid") ? (
                                <div className="message-item">
                                  <div className="message-user">
                                    <figure className="avatar">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                      />
                                    </figure>
                                    <div>
                                      <h5> {value.sender.name}</h5>

                                      <div className="time">{value.id}</div>
                                    </div>
                                  </div>
                                  <div className="message-wrap">
                                    {value.message}
                                  </div>
                                </div>
                              ) : (
                                <div className="message-item outgoing-message">
                                  <div className="message-user">
                                    <figure className="avatar">
                                      <img
                                        src="assets/images/user.png"
                                        alt="avater"
                                      />
                                    </figure>
                                    <div>
                                      <h5> {value.sender.name}</h5>
                                      <div className="time">{value.id}</div>
                                    </div>
                                  </div>
                                  <div className="message-wrap">
                                    {value.message}
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                      <div ref={myRef} />
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </div>
                <div
                  className="chat-bottom dark-bg p-3 shadow-none theme-dark-bg"
                  style={{ width: "98%" }}
                >
                  <div className="chat-form">
                    {/* <button className="bg-grey float-left">
                      <i className="ti-microphone text-grey-600"></i>
                    </button> */}
                    {/* <div className="form-group"> */}
                    <div style={{
                      width:"calc(100% - 90px)",
                      borderRadius:"30ox",
                      float : "left",
                      margin : "0 5px",
                      position:"relative",
                      
                    
                    }}>
                      <input style={{
                        backgroundColor:"#ebeefc",
           
                      }}
                        type="text"
                        
                        placeholder="Start typing.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            createChat({
                              variables: {
                                message: message,
                                senderId: Number(
                                  window.localStorage.getItem("userid")
                                ),
                                receiverId:
                                  props.location.state.fromNotifications,
                              },
                            });
                            setMessage("");
                          }
                        }}
                      />
                    </div>
                    <button
                      className="bg-current"
                      onClick={() => {
                        {
                          createChat({
                            variables: {
                              message: message,
                              senderId: Number(
                                window.localStorage.getItem("userid")
                              ),
                              receiverId:
                                props.location.state.fromNotifications,
                            },
                          });
                          setMessage("");
                        }
                      }}
                    >
                      <i className="ti-arrow-right text-white"></i>
                    </button>
                  </div>

                  {/* <form className="chat-form">
                    <button className="bg-grey float-left">
                      <i className="ti-microphone text-grey-600"></i>
                    </button>
                    <div className="form-group">
                      <input type="text" placeholder="Start typing.." />
                    </div>
                    <button className="bg-current">
                      <i className="ti-arrow-right text-white"></i>
                    </button>
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

export default Chat;
