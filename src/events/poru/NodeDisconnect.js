const AvonClientEvent = require("../../structures/Eventhandler");

class AvonNodeDisconnect extends AvonClientEvent{
    get name(){
        return 'nodeDisconnect';
    }
    async run(node){
        console.log(`PORU { NODE EVENT } => NODE ${node.name} IS DISCONNECTED`);
    }
}
module.exports = AvonNodeDisconnect;