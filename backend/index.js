import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { gameManager } from "./src/gameManager.js";

const app = express();
const httpServer = app.listen(3000, () => {
  console.log("server started");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  const player = gameManager.addplayer({ id: Math.random(), name: "test" });

  ws.send(
    JSON.stringify({
      type: "selfplayer",
      data: player,
    })
  );

  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "addplayer",
          data: gameManager.getplayers(),
        })
      );
    }
  });

  ws.on("close", function close() {
    gameManager.removeplayer(player);
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
  });
  ws.on("message", function message(data) {
    
    const message = JSON.parse(data);
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
        console.log("answer",message.data);
        ws.send(JSON.stringify({type:"answer",data:message.data}))
    }
  });

  //   ws.send("Hello! Message From Server!!");
});
