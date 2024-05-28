import { useState } from "react";

export const MessageBox = ({ socket, messages }) => {
  const [inputMessage, setInputMessage] = useState("");

  const Handler1 = () => {
    if (inputMessage === "answer") {
      socket.send(
        JSON.stringify({
          type: "answer",
          data: inputMessage,
        })
      );
    } else {
      socket.send(
        JSON.stringify({
          type: "message",
          data: inputMessage,
        })
      );
    }
  };
  
  return (
    <div>
      <div>message</div>
      <input
        className=" m-4 rounded-2xl bg-slate-300  "
        type="text"
        placeholder="   message"
        onChange={(e) => setInputMessage(e.target.value)}
      ></input>
      <button className="bg-blue-300 m-4  rounded-2xl," onClick={Handler1}>
        send
      </button>
      <div>
        {messages.map((item) => {
          return <div key={item}>{item}</div>;
        })}
      </div>
    </div>
  );
};
