class Gamemanager{
    players=[]
   
    constructor(){
        this.player=[]
    }
    getplayers(){
        return this.player
    }

    addplayer({id,name}){
        const newplayer={
            name:name,
            id:id,
            score:0
        }
        this.player.push(newplayer);
    }
    removeplayer(player){
        this.player.pop(player)
    }
}
export const gameManager=new Gamemanager();