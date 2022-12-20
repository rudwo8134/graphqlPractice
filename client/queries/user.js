import { gql } from "@apollo/client";

const userQuery = gql`
  {
    user {
      id
      email
    }
  }
`;

export default userQuery;
