import React from "react";
import { graphql } from "react-apollo";
import Query from "../queries/user";

const Header = (props) => {
  console.log(props);
  return <div>jjj</div>;
};

export default graphql(Query)(Header);
