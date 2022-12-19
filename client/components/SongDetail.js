import React from "react";
import { graphql } from "react-apollo";
import query from "../queries/fetchsong";
import { Link } from "react-router-dom";
import { gql } from "graphql-tag";
import LyricList from "./LyricList";

const SongDetail = (props) => {
  const data = props.data.song;
  const [text, setText] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.mutate({
      variables: {
        id: data.id,
        content: text,
      },
    });
    await setText("");
    await props.data.refetch();
  };
  if (props.data.loading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{data.title}</h3>
      <LyricList lyrics={data.lyrics} />
      <form onSubmit={handleSubmit}>
        <label> Add a Lyric</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};


const mutation = gql`
  mutation AddLyrics($id: ID, $content: String) {
    addLyricToSong(songId: $id, content: $content) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;

export default graphql(mutation)(
  graphql(query, {
    options: () => {
      const location = window.location.href;
      const id = location.split("songs/")[1];
      return { variables: { id: id } };
    },
  })(SongDetail)
);
