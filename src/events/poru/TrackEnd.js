const AvonClientEvent = require("../../structures/Eventhandler");

class TrackEnd extends AvonClientEvent{
    get name(){
        return 'trackEnd';
    }
    async run(player){
        try{
            player.message.delete()
        } catch(e)
        {
            
        }
    }
}
module.exports = TrackEnd;