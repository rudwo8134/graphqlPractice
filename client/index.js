import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/app";

const client = new ApolloClient({
  uri: "http:localhost:4000/graphql",
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App>Hello world!</App>,
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
