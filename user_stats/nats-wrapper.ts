import { connect, NatsConnection } from "nats";

class NatsWrapper {
    private _client?: NatsConnection;

    get client() {
        if(!this._client) {
            throw new Error('Cannot access Nats client before connecting')
        }
        return this._client;
    }
    
    async newConnection(url: string) {
    try { 
        this._client = await connect( { servers: url } );
        console.log( `connected to ${ this._client.getServer() }` );
      } catch ( error ) {
        console.log( 'NATS ERROR: ', error )
      }
    }
}

export const natsWrapper = new NatsWrapper();