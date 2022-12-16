import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, redirect, useNavigate } from "react-router-dom";
import query from "../queries/fetchSongs";

const SongCreate = (props) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await props.mutate({
        variables: {
          title: title,
        },
        refetchQueries: [
          {
            query: query,
            variables: null,
          },
        ],
      });
      navigate("/");
    } catch (err) {
    } finally {
      setTitle("");
    }
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create New Song</h3>
      <form onSubmit={submitHandler}>
        <label>Song Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="center green ">
          Submit
        </button>
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
