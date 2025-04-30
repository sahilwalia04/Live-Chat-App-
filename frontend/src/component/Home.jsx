import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adjust as needed

function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState('');
  const [hasName, setHasName] = useState(false);

  const sendChat = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', { username, message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('chat message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  if (!hasName) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Welcome to Chat App</h2>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded hover:opacity-90 transition duration-300"
            onClick={() => {
              if (username.trim()) setHasName(true);
            }}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-purple-700 drop-shadow">🌟 React Chat App</h2>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="h-96 overflow-y-scroll space-y-2 mb-4 scrollbar-thin scrollbar-thumb-purple-300 pr-2">
          {chat.map((entry, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2 rounded-lg text-white animate-fade-in ${
                entry.username === username
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 self-end ml-auto text-right'
                  : 'bg-gradient-to-r from-purple-400 to-pink-500 self-start mr-auto text-left'
              }`}
            >
              <p className="text-sm font-semibold">{entry.username}</p>
              <p>{entry.message}</p>  
            </div>
          ))}
        </div>

        <form onSubmit={sendChat} className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-r-full hover:opacity-90 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
