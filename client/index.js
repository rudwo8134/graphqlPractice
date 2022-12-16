import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import SongList from "./components/SongList";

import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import SongCreate from "./components/SongCreate";
import "./style/style.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

const router = createHashRouter([
  {
    path: "/",
    element: (
      <App>
        <SongList />
      </App>
    ),
  },
  {
    path: "/create",
    element: (
      <App>
        <SongCreate />
      </App>
    ),
  },
]);

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
