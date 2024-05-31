class Gamemanager {
  players = [];

  constructor() {
    this.player = [];
  }
  getplayers() {
    
    return this.player;
  }

  addplayer({ id, name }) {
    const newplayer = {
      name: name,
      id: id,
      score: 0,
    };
    this.player.push(newplayer);
    return newplayer;
  }
  removeplayer(player) {
    const playerId=player.id;
    console.log("removeplayer in gamemanager",playerId);
    
    this.player = this.player.filter((p) => p.id !== playerId);
  }
  addScore(player) {
    
    const playerIndex = this.player.findIndex((p) => p.id === player.data.id);

    if (playerIndex !== -1) {
      
      this.player[playerIndex].score += 1;
    } else {
      console.error(`Player with id ${player.data.id} not found.`);
    }
  }
}
export const gameManager = new Gamemanager();
