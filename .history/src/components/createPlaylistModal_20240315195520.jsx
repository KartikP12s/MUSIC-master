import React, { forwardRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "../projectCss/createPlaylistModal.css";

const CreatePlaylistModal = forwardRef((props, ref) => {
  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");
  const [songs, setSongs] = useState([]);
  const {id} = useParams()
const handleCreatePlaylist = (e) => {
    e.preventDefault(); // This will prevent the default action of the event which is refreshing the page.
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(id);
    axios
        .post(`http://localhost:443/create-playlist/${id}`, {
            playlistName,
            playlistDescription,
            songs,
        })
        .then((response) => {
            console.log(response.data);
            console.log("Playlist Created");
        })
        .catch((error) => {
            console.error(error); // Changed from response.data.error to error because in catch block we get error not response.
            console.log(error);
        });
};
  return (
    <>
      <div className="background-dimmer"></div>
      <div className="holder">
        <div ref={ref} className="container">
          <form className="playlist-form">
            <h1>Create New Playlist</h1>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={playlistName}
              onChange={(e) => setplaylistName(e.target.value)}
              required
            />
            <input
              type="text"
              id="name"
              placeholder="Description"
              value={playlistDescription}
              onChange={(e) => setplaylistDescription(e.target.value)}
            />

            <button onClick={handleCreatePlaylist}>Create</button>
          </form>
        </div>
      </div>
    </>
  );
});

export default CreatePlaylistModal;
