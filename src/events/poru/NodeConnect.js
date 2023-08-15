const AvonClientEvent = require("../../structures/Eventhandler");

class AvonNodeConnect extends AvonClientEvent{
    get name(){
        return 'nodeConnect';
    }
    async run(node){
        console.log(`PORU { NODE EVENT } => NODE ${node.name} IS CONNECTED`)
    }
}
module.exports = AvonNodeConnect;