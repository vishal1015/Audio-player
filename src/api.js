// api.js
import axios from 'axios';

const CLOUD_NAME = 'vishalcloudk'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'l9pp3xvn'; // Replace with your Cloudinary upload preset

export const fetchAudioFiles = async () => {
  try {
    const response = await axios.get(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/audio`);
    console.log(response);
    return response.data.resources;
  } catch (error) {
    console.error('Error fetching audio files{{{}}}:', error);
    return [];
  }
};

export const uploadAudioFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData);
    return {
      name: file.name,
      src: response.data.secure_url,
    };
  } catch (error) {
    console.error('Error uploading audio file:', error);
    return null;
  }
};
