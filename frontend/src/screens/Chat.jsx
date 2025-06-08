// frontend/src/components/Chat.js
import React, { useState, useContext } from 'react';
import FileUpload from './FileUpload';
import { UserContext } from '../context/user.context'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext)
    const messageBox = React.createRef()

  const handleFileUpload = (filePath) => {
    console.log('File uploaded:', filePath); // Debugging
    const newMessage = {
      type: 'file',
      content: filePath,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex flex-col  p-4 bg-slate-300">
      <FileUpload onFileUpload={handleFileUpload} className="mb-6" />
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            
            {msg.type === 'file' ? (
              <div className="p-2 bg-white rounded shadow">
                <a
                  href={msg.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View File
                </a>
              </div>
            ) : (
              <div className="p-2 bg-white rounded shadow">{msg.content}</div>
            )}
            <span className="text-xs text-gray-500">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Chat;