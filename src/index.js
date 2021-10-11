// React Required
import React, { Component } from "react";
import ReactDOM from "react-dom";

// Create Import File
import "./main.scss";

// Common Layout
import Demo from "./demo/Demo";
import Home from "./pages/Home";

import Badge from "./pages/Badge";
import Group from "./pages/Group";
import Storie from "./pages/Storie";
import Member from "./pages/Member";
import Findfrends from "./pages/Findfrends";
import Friendslist from "./pages/Friendslist";



import ChatPage from "./pages/ChatPage";

import Email from "./pages/Email";
import Emailopen from "./pages/Emailopen";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Makeroom from "./pages/Makeroom";

import Contactinfo from "./pages/Contactinfo";
import Socialaccount from "./pages/Socialaccount";
import Password from "./pages/Password";
import Payment from "./pages/Payment";
import Notification from "./pages/Notification";
import Helpbox from "./pages/Helpbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Notfound from "./pages/Notfound";

import ShopOne from "./pages/ShopOne";
import ShopTwo from "./pages/ShopTwo";
import ShopThree from "./pages/ShopThree";
import Singleproduct from "./pages/Singleproduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Chat from "./pages/Chat";
import Live from "./pages/Live";

import Event from "./pages/Event";
import Hotel from "./pages/Hotel";
import Videos from "./pages/Videos";
import Comingsoon from "./pages/Comingsoon";

import Grouppage from "./pages/Grouppage";
import Userpage from "./pages/Userpage";
import Authorpage from "./pages/Authorpage";

import Analytics from "./pages/Analytics";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});
// const httpLink = new HttpLink({
//   uri: 'http://localhost:4000/'
// });
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   // uri: "http://18.220.98.98:4000/",
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

function Root() {
  return (
    <BrowserRouter basename={"/"}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route exact path={`${process.env.PUBLIC_URL}/home`} component={Home} />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultbadge`}
          component={Badge}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultgroup`}
          component={Group}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultstorie`}
          component={Storie}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/chat`}
          component={ChatPage}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultemailbox`}
          component={Email}
        />
        <Route exact path={`${process.env.PUBLIC_URL}/demo`} component={Demo} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultemailopen`}
          component={Emailopen}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultsettings`}
          component={Settings}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultvideo`}
          component={Videos}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultanalytics`}
          component={Analytics}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/accountinformation`}
          component={Account}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/makeroom`}
          component={Makeroom}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultmember`}
          component={Member}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/findfriends`}
          component={Findfrends}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/friendslist`}
          component={Friendslist}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/contactinformation`}
          component={Contactinfo}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/socialaccount`}
          component={Socialaccount}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/password`}
          component={Password}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/payment`}
          component={Payment}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultnotification`}
          component={Notification}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/helpbox`}
          component={Helpbox}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/login`}
          component={Login}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/register`}
          component={Register}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/forgot`}
          component={Forgot}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/notfound`}
          component={Notfound}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop1`}
          component={ShopOne}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop2`}
          component={ShopTwo}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/shop3`}
          component={ShopThree}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/singleproduct`}
          component={Singleproduct}
        />
        {/* <Route
          exact
          // path={`${process.env.PUBLIC_URL}/singleproduct`}
          path="/singleproduct/:queryparmas"
          children={<Singleproduct />}
        /> */}

        <Route exact path={`${process.env.PUBLIC_URL}/cart`} component={Cart} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/checkout`}
          component={Checkout}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultmessage`}
          component={Chat}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultlive`}
          component={Live}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaultevent`}
          component={Event}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/defaulthotel`}
          component={Hotel}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/grouppage`}
          component={Grouppage}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/userpage`}
          component={Userpage}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/authorpage`}
          component={Authorpage}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/comingsoon`}
          component={Comingsoon}
        />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.register();
