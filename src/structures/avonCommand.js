const uuid = require(`uuid`);
class AvonCommand {
    constructor(client){
        this.client = client;
        this.category == null;
        this.uid = uuid.v4();
        if (this.constructor === AvonCommand) throw new TypeError('Ok Done'); 
        if (this.name === undefined) throw new TypeError('Name No Found');
        if (this.run === undefined) throw new TypeError('Run Cmd');
    }
}
module.exports = AvonCommand;