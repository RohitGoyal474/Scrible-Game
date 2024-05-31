import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { gameManager } from "./src/gameManager.js";

const app = express();
const httpServer = app.listen(3000, () => {
  console.log("server started");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {

  const id=Math.random();
  ws.id=id;

  ws.on("error", console.error);
  


  ws.on("close", function close() {
    const playerId=ws.id;
    const removePlayer=gameManager.getplayers().find((p)=>p.id===playerId);
    //
    console.log("player to remove", removePlayer);
    console.log("players before remove",gameManager.getplayers());
    //
    gameManager.removeplayer(removePlayer);
      console.log("players after remove", gameManager.getplayers());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "removeplayer",
            data: gameManager.getplayers(),
            removeId:removePlayer
          })
        );
      }
    });
  });
  ws.on("message", function message(data) {
    
    const message = JSON.parse(data);
   
   

    if(message.type==="addplayer"){
      
       const player = {
         id: ws.id,
         name: message.data,
       };
        gameManager.addplayer(player);
       //
       ws.send(
         JSON.stringify({
           type: "selfplayer",
           data: player,
         })
       );
       //
        wss.clients.forEach(function each(client) {
          const getp = gameManager.getplayers;
         
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "addplayer",
                  data: gameManager.getplayers(),
                })
              );
            }
          });
    }

    if(message.type==="removeplayer"){
      console.log("removeplayer",message.data);
        gameManager.removeplayer(message.data);
        wss.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "removeplayer",
                data: gameManager.getplayers(),
              })
            );
          }
        });
    }


    if (message.type === "score") {
      gameManager.addScore(message);

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "score",
              data: gameManager.getplayers(),
            })
          );
        }
      });
    }
    if (message.type === "message") {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "message",
              data: message.data,
            })
          );
        }
      });
    }
    if(message.type==="answer"){
        
        ws.send(JSON.stringify({type:"answer",data:message.data}))
    }
    if(message.type==="start"){
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "start",
                  data: gameManager.getplayers(),
                })
              );
            }
          });
    }
  });

  //   ws.send("Hello! Message From Server!!");
});
