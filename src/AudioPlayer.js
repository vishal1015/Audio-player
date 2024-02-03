// AudioPlayer.js
import React from 'react';

const AudioPlayer = ({ currentTrack, onAudioEnded }) => {
  return (
    <>
      <h2>Now Playing</h2>
      <p>{currentTrack.name}</p>
      <audio
        controls
        src={currentTrack.src}
        onEnded={onAudioEnded}
        autoPlay
      />
    </>
  );
};

export default AudioPlayer;
