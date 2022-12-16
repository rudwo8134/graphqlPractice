import React from "react";
import { graphql } from "react-apollo";
import { Link, useNavigate } from "react-router-dom";
import query from "../queries/fetchSongs";
import { gql } from "graphql-tag";

const SongList = (props) => {
  const navigate = useNavigate();
  const HandleClick = async (id) => {
    await props.mutate({
      variables: {
        id: id,
      },
    });
    await props.data.refetch();
  };
  const renderSongs = () => {
    return props.data.songs.map((song) => {
      return (
        <li
          key={song.id}
          className="collection-item"
          onClick={() => navigate(`/songs/${song.id}`)}
        >
          {song.title}
          <i className="material-icons" onClick={() => HandleClick(song.id)}>
            delete
          </i>
        </li>
      );
    });
  };
  if (props.data.loading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <ul className="collection">{renderSongs()}</ul>
      <Link to="/create" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </div>
  );
};

const Mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(Mutation)(graphql(query)(SongList));
