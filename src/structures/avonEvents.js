const { readdirSync } = require("fs");
const ascii = require(`ascii-table`);
const table = new ascii().setHeading('Client Events','Status');
const table2 = new ascii().setHeading('Poru Events','Status');
class AvonEvents {
    constructor(client){
        this.client = client;
        this.load = false;
    }
    loadEvents(){
        readdirSync(`./src/events/client/`).forEach(file => {
            let event = new (require(`../events/client/${file}`))(this.client);
            const run = event.run.bind(event);
            this.client.on(event.name,run);
            let name = file.split('.')[0];
            table.addRow(name,'✅');
        });
        console.log(table.toString());
        readdirSync(`./src/events/poru/`).forEach(f => {
            let event = new (require(`../events/poru/${f}`))(this.client);
            const run = event.run.bind(event);
            this.client.poru.on(event.name,run);
            let name = f.split('.')[0];
            table2.addRow(name,"✅");
        });
        console.log(table2.toString());
        this.load = true;
        return this;
    }
}
module.exports = AvonEvents;