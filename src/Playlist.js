// Playlist.js
import React from 'react';

const Playlist = ({ playlist, playTrack }) => {
  return (
    <>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => playTrack(index)}>
            {track.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Playlist;
