"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for interacting with bot specific endpoints
 */
class BotMethods {
    /**
     * Create a new Bot Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.bot.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get the gateway url to connect to
     * @returns  {Promise.<GatewayData>} [Gateway data](https://discordapp.com/developers/docs/topics/gateway#get-gateway-example-response)
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg"}
     */
    getGateway() {
        return this.requestHandler.request(Endpoints_1.default.GATEWAY, 'get', 'json');
    }
    /**
     * Get the gateway url to connect to and a recommended amount of shards to use
     * @returns {Promise.<GatewayData>} [Gateway data](https://discordapp.com/developers/docs/topics/gateway#get-gateway-example-response)
     * @example
     * let client = new SnowTransfer('TOKEN');
     * let result = await client.bot.getGateway();
     * // result should be something like {"url": "wss://gateway.discord.gg", "shards": 1}
     */
    getGatewayBot() {
        return this.requestHandler.request(Endpoints_1.default.GATEWAY_BOT, 'get', 'json');
    }
}
/**
 * @typedef {Object} GatewayData
 * @property {String} url - url to connect to
 * @property {Number} [shards] - number of shards, recommended by discord
 */
exports.default = BotMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm90cy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9tZXRob2RzL0JvdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBcUM7QUFJckM7O0dBRUc7QUFDSCxNQUFNLFVBQVU7SUFJWjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxjQUE4QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILGFBQWE7UUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBQ0o7QUFFRDs7OztHQUlHO0FBRUgsa0JBQWUsVUFBVSxDQUFDIn0=