import { useState,useEffect } from "react";
import { gameManager } from "../component/class";
import { ScoreBoard } from "../component/scoreBoard";
import { MessageBox } from "../component/messageBox";

function Body() {
  const [selfPlayer, setSelfPlayer] = useState(null);
  const [socket,setSocket]=useState(null)
  const [players,setPlayers]=useState([])
  const [messages, setMessages] = useState([]);
  const [answerStatus, setAnswerStatus] = useState(false);
  

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setSocket(socket);
    
  }, []);
  
  if(!socket){
    return (
      <div>Loading...</div>
    )
  }
  socket.onmessage=(event)=>{
    
     const message = JSON.parse(event.data);
    
     if(message.type==="addplayer"){
      console.log(message.data);
      setPlayers(message.data)
     }
     if(message.type==="removeplayer"){
      setPlayers(message.data)
     }
     if(message.type==="score"){
      console.log("score",message.data);
      setPlayers(message.data)
     }
     if(message.type==="selfplayer"){
      console.log("selfplayer",message.data);
      setSelfPlayer(message.data)
     }
     if(message.type==="message"){
      setMessages((prevMessages) => [...prevMessages, message.data]);
     }
     if(message.type==="answer"){
      setMessages((prevMessages) => [...prevMessages, message.data]);
      setAnswerStatus(true);
     }
  }

  return (
    <>
    <div>hii there</div>
    <ScoreBoard players={players} socket={socket} selfPlayer={selfPlayer}/>
    <MessageBox socket={socket} messages={messages} answerStatus={answerStatus}/>
    </>
  );
}

export default Body;
