import React, { useState } from 'react';
import axios from '../config/axios'
import { FiUpload } from "react-icons/fi";

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile); // Debugging
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected'); // Debugging
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Uploading file...'); // Debugging
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data); // Debugging
      onFileUpload(response.data.filePath);
    } catch (error) {
      console.error('Error uploading file:', error); // Debugging
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-2">
       <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Label acts as button */}
      <label htmlFor="file-upload" className="cursor-pointer p-2 border rounded bg-gray-100 hover:bg-gray-200">
        <FiUpload className="text-gray-600 text-xl" />
      </label>
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
