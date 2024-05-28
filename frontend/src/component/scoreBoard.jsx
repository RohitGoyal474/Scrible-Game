export const ScoreBoard = ({ players, socket, selfPlayer }) => {
    const clickHandler = () => {
      console.log("clicked");
      socket.send(JSON.stringify({ type: "score", data: selfPlayer }));
    }
    console.log("players", players);
    if (!players) {
      return <div>Loading...</div>;
    }
  return (
    
    <div>
      {players.map((item) => {
        return (
          <div className=" flex justify-center" key={item.id}>
            <div className="bg-blue-300 h-1/4 w-1/4 flex justify-center">
              {item.name} : {item.score}
            </div>
            <button className="bg-red-300 rounded-lg" onClick={clickHandler}>
              score +1
            </button>
          </div>
        );
      })}
    </div>
  );
};
