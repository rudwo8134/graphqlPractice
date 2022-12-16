import React from "react";
import { gql } from "graphql-tag";
import { graphql } from "react-apollo";

const LyricList = (props) => {
  const handleClick = (id, likes, content) => {
    props.mutate({
      variables: {
        id: id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
          content: content,
        },
      },
    });
  };
  return (
    <ul className="collection">
      {props.lyrics.map(({ id, content, likes }) => {
        return (
          <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
              <i
                className="material-icons"
                onClick={() => handleClick(id, likes, content)}
              >
                thumb_up
              </i>
              {likes}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
const mutation = gql`
  mutation AddLike($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
      content
    }
  }
`;

export default graphql(mutation)(LyricList);
