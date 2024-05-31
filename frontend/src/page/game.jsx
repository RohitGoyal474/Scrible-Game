import { useLocation } from "react-router-dom";
import { ScoreBoard } from "../component/scoreBoard"; // Assuming you have a ScoreBoard component
import { useEffect, useState } from "react";
import { MessageBox } from "../component/messageBox";

export const Game = () => {
  const location = useLocation();
  const [selfPlayer, setSelfPlayer] = useState(null);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);




  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setSocket(socket);
  
    socket.onopen = () => {
      
      socket.send(JSON.stringify({ type: "addplayer", data: location.state }));
    };
    socket.onclose = () => {
      
      socket.send(JSON.stringify({ type: "removeplayer", data: selfPlayer }));
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      setMessage(message.data);

      if (message.type === "addplayer") {
        setPlayers(message.data);
      }
      if (message.type === "removeplayer") {
        setPlayers(message.data);
      }
      if (message.type === "score") {
        setPlayers(message.data);
      }
      if (message.type === "selfplayer") {
        setSelfPlayer(message.data);
      }
      if (message.type === "message") {
        setChatMessage((prevMessages) => [...prevMessages, message.data]);
      }
      if (message.type === "answer") {
        setChatMessage((prevMessages) => [...prevMessages, message.data]);
        
      }
    };
  }, []);
  return (
    <div>
      <h1>Game</h1>
      <ScoreBoard players={players} socket={socket} selfPlayer={selfPlayer} />
      <MessageBox
        socket={socket}
        messages={chatMessage}
       
      />
    </div>
  );
};
