// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Playlist from './Playlist';
import AudioPlayer from './AudioPlayer';
import { fetchAudioFiles, uploadAudioFile } from './api';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const loadAudioFiles = async () => {
      const files = await fetchAudioFiles();
      setPlaylist(files);

      // Retrieve last playing track index from local storage
      const storedIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
      setCurrentTrackIndex(storedIndex);
    };

    loadAudioFiles();
  }, []);

  useEffect(() => {
    // Save the current track index to local storage
    localStorage.setItem('currentTrackIndex', currentTrackIndex.toString());
  }, [currentTrackIndex]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const uploadedFile = await uploadAudioFile(files[0]);
      setPlaylist([...playlist, uploadedFile]);

      if (playlist.length === 0) {
        setCurrentTrackIndex(0);
      }
    }
  };

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const playNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  const onAudioEnded = () => {
    playNextTrack();
  };

  return (
    <div className="audio-player">
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {playlist.length > 0 && (
        <>
          <Playlist playlist={playlist} playTrack={playTrack} />
          <AudioPlayer currentTrack={playlist[currentTrackIndex]} onAudioEnded={onAudioEnded} />
        </>
      )}
    </div>
  );
};

export default App;
