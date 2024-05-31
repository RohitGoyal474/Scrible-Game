export const ScoreBoard = ({ players, socket, selfPlayer }) => {
    const clickHandler = () => {
     
      socket.send(JSON.stringify({ type: "score", data: selfPlayer }));
    }
   
    if (!players) {
      return <div>Loading...</div>;
    }
  return (
    
    <div className=" w-1/4  border-2 ">
      {players.map((item) => {
        return (
          <div className=" grid grid-cols-12 gap-2 " key={item.id}>
            <div className="bg-red-400 col-span-7 m-1 rounded-lg flex justify-center">
              {item.name}
            </div>
            <div className="bg-blue-400 col-span-3 m-1 rounded-lg flex justify-center">
              {item.score}
            </div>
            <button
              className="bg-red-300 rounded-lg col-span-2 m-1"
              onClick={clickHandler}
            >
              score 
            </button>
          </div>
        );
      })}
    </div>
  );
};
