import { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Layout from "../src/components/Layout";
import Query from "../src/gql/Query";
import Mutation from "../src/gql/Mutation";
import Subscription from "../src/gql/Subscription";
import ChatBubble from "../src/components/ChatBubble";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { getToken } from "../src/utils/tokenUtils";
import cookies from "next-cookies";

const ChatPage = (props) => {
  const router = useRouter();
  const myRef = useRef(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const receiverId = Number(router.query?.receiverId);

  const { subscribeToMore, data, loading } = useQuery(Query.chats, {
    variables: {
      senderId: Number(props?.user?.id),
      receiverId,
    },
  });

  const [createChat] = useMutation(Mutation.createChat);

  // subscription hook
  useEffect(() => {
    subscribeToMore({
      document: Subscription.chats,
      variables: {
        receiverId: Number(router.query?.receiverId),
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.Chat.message;
        return {
          chats: [...prev.chats, newMessage],
        };
      },
    });
  }, []);

  // scroll to bottom hook
  useEffect(() => {
    if (myRef) {
      myRef?.current?.scrollIntoView();
    }
  }, [data?.chats, myRef]);

  if (loading) {
    return <div>loading</div>;
  } else {
    const searchableChats =
      data?.chats?.filter((chat) => {
        return chat?.message.includes(search);
      }) ?? [];

    //   profile of the receiver
    const receiverProfile = data?.chats.find(
      (chat) => Number(chat.receiver.id) === receiverId
    );

    // View Layer
    return (
      
        <Card className="md-width border-bottom-0">
          <Card.Header className="py-4 bg-danger text-white">
            Chatting with: {receiverProfile.receiver.name}
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
            <Row className="overflow-auto">
              {searchableChats.map((chat, i) => {
                return (
                  <Col xs="12" key={i}>
                    <ChatBubble
                      chat={chat}
                      receiverId={receiverId}
                      ref={myRef}
                    />
                  </Col>
                );
              })}
            </Row>
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
                            message,
                            receiverId,
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
                        receiverId,
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
    
    );
  }
};

export default ChatPage;