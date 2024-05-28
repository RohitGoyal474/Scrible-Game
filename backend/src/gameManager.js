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
    this.player.pop(player);
  }
  addScore(player) {
    console.log("player", player);
    console.log("this.players", this.player);
    const playerIndex = this.player.findIndex((p) => p.id === player.data.id);

    if (playerIndex !== -1) {
        console.log("playerIndex",playerIndex);
      this.player[playerIndex].score += 1;
    } else {
      console.error(`Player with id ${player.id} not found.`);
    }
  }
}
export const gameManager = new Gamemanager();
