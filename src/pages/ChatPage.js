import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";



import { useQuery, useMutation, gql } from "@apollo/client";

var aaa = [];

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

// const CHAT_QUERY = gql`
//   query chatlist {
//     chatlist {
//       id
//       receiver {
//         id
//         name
//       }
//       sender {
//         id
//         name
//       }
//       createdAt
//       updatedAt
//     }
//   }
// `;

const CHAT_QUERY = gql`
  query chatmantoman($receiverId: Int!, $senderId: Int!) {
    chatmantoman(receiverId: $receiverId, senderId: $senderId) {
      id
      message
      createdAt
      updatedAt
    }
  }
`;

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
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
      }
    }
  }
`;
// const newChat = gql`
//   subscription Chat($receiverId: Int!, $senderId: Int!) {
//     Chat(receiverId: $receiverId, senderId: $senderId) {
//       mutation
//       message {
//         id
//         receiver {
//           name
//         }
//         sender {
//           name
//         }
//         createdAt
//         message
//         updatedAt
//       }
//     }
//   }
// `;
let unsubscribe = null; //publish 했을때 변화

const ChatPage = () => {
  const myRef = useRef(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [result, setresult] = useState([]);
  const receiverId = 2;

  const { subscribeToMore, data, loading } = useQuery(CHAT_QUERY, {
    variables: {
      senderId: 1,
      receiverId: 2,
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

  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useQuery(CHAT_QUERY, {
    variables: {
      senderId: 1,
      receiverId: 2,
    },
    onCompleted({ data2 }) {
      if (data2) {
        console.log("data2", data2);
      }
    },
    onError({ error2 }) {
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
  useEffect(() => {
    if (myRef) {
      return myRef?.current?.scrollIntoView();
    }
  }, [data?.chats, myRef]);
  useMemo(() => {
    console.log("useMemo1", data);
  }, [data]);

  // subscription hook
  useEffect(() => {
    subscribeToMore({
      document: newChat,
      variables: {
        receiverId: 2,
        senderId: 1,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          console.log("11", subscriptionData);
          return prev.chatmantoman;
        }
        const newMessage = subscriptionData.data.Chat.message;
        setresult(newMessage);
        console.log("21", subscriptionData.data.Chat.message);
        console.log("21prev", prev);
         console.log("21prev", [...prev.chatmantoman, newMessage]);
        return {
          // aaa: [...prev, ...newMessage],
          // chats: [...prev.chatmantoman, newMessage],
        };
      },
    });
  }, [data]);

  // useMemo(() => {
  //   console.log("useMemo1chats", chats);
  // }, [chats]);

  useEffect(() => {
    console.log("aaa", aaa);
  }, [aaa]);

  useEffect(() => {
    console.log("message", message);
  }, [message]);

  // scroll to bottom hook
  // useEffect(() => {
  //   if (myRef) {
  //     return myRef?.current?.scrollIntoView();
  //   }
  // }, [data?.chats, myRef]);

  if (loading) {
    return <div>loading</div>;
  } else {
    const searchableChats =
      data?.chats?.filter((chat) => {
        return chat?.message.includes(search);
      }) ?? [];
    return (
      <div>
        {!loading && (
          <Card className="md-width border-bottom-0">
            <Card.Header className="py-4 bg-danger text-white">
              {/* Chatting with: {receiverProfile.receiver.name} */}
            </Card.Header>
            <Card.Body>
              <Row className="mb-3 pb-2 border-dark border-bottom">
                <input
                  type="text"
                  className="form-control w-100"
                  placeholder="search for chat..."
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
              </Row>
              {console.log("aaa22", aaa)}
              {/* <Row className="overflow-auto">
                {searchableChats.map((chat, i) => {
                  return (
                    <Col xs="12" key={i}>
                      <ChatBubble
                        chat={chat}
                        receiverId={Number(2)}
                        ref={myRef}
                      />
                    </Col>
                  );
                })}
              </Row> */}
              <Row className="chat-message clearfix">
                <Col xs="12" md="10">
                  <div>
                    <textarea
                      name="message-to-send"
                      value={message}
                      id="message-to-send"
                      placeholder="Type your message"
                      rows="3"
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          createChat({
                            variables: {
                              message: message,
                              receiverId: 2,
                              senderId: 1,
                            },
                          });
                          setMessage("");
                        }
                      }}
                    />
                  </div>
                </Col>
                <Col md="2" className="align-self-center">
                  <Button
                    size="lg"
                    variant="danger"
                    onClick={(e) => {
                      createChat({
                        variables: {
                          message,
                          receiverId: 2,
                          senderId: 1,
                        },
                      });
                      setMessage("");
                    }}
                  >
                    Send
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
};

export default ChatPage;
