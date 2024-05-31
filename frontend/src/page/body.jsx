import { useState, useEffect } from "react";
import { gameManager } from "../component/class";
import { ScoreBoard } from "../component/scoreBoard";
import { MessageBox } from "../component/messageBox";
import { useNavigate } from "react-router-dom";

function Body() {
  const [selfPlayer, setSelfPlayer] = useState(null);
  const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(false);

  const navigate = useNavigate();
  const setplayerfunction=async (message)=>{
     setPlayers(message);
  }
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setSocket(socket);
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

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
        setMessages((prevMessages) => [...prevMessages, message.data]);
      }
      if (message.type === "answer") {
        setMessages((prevMessages) => [...prevMessages, message.data]);
        setAnswerStatus(true);
      }
      if (message.type === "start") {
        setPlayers(message.data);


        // in this i want to navigate to game page, but players does not update plaease correct it
        navigate("/game", { state: players });
      }
    };
    socket.onclose = () => {
      socket.send(JSON.stringify({ type: "disconnect" }));
    };
  }, []);

  if (!socket) {
    return <div>Loading...</div>;
  }

  const startHandndler = () => {
    socket.send(JSON.stringify({ type: "start" }));
  };
  return (
    <>
      <ScoreBoard players={players} socket={socket} selfPlayer={selfPlayer} />
      <MessageBox
        socket={socket}
        messages={messages}
        answerStatus={answerStatus}
      />
      <button onClick={startHandndler}>button</button>
    </>
  );
}

export default Body;
