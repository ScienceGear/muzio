const EventEmitter = require('events');

class AvonClientEvent extends  EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        if (this.constructor === AvonClientEvent) throw new TypeError('The Error');
        if (this.name === undefined) throw new TypeError('Name Is Missing');
        if (this.run === undefined) throw new TypeError('Make Event on Function');
        this.on('error', (error) => client.logger.error(error));
    }

    run(...args) {
        this.run(...args)
            .catch(error => this.emit('error', error));
    }
}
module.exports = AvonClientEvent;