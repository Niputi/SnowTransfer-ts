"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for interacting with users
 */
class UserMethods {
    /**
     * Create a new User Method handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.user.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get information about current user
     * @returns {Promise.<SelfUser>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     */
    async getSelf() {
        return this.requestHandler.request(Endpoints_1.default.USER('@me'), 'get', 'json');
    }
    /**
     * Get information about a user via Id
     * @param {String} userId - Id of the user
     * @returns {Promise.<User>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     */
    async getUser(userId) {
        return this.requestHandler.request(Endpoints_1.default.USER(userId), 'get', 'json');
    }
    /**
     * Update the current user
     * @param {Object} data
     * @param {String} [data.username] - Username to change
     * @param {String} [data.avatar] - Base64 encoded avatar
     * @returns {Promise.<SelfUser>} [user object](https://discordapp.com/developers/docs/resources/user#user-object)
     *
     * @example
     * // update the avatar of the user
     * let client = new SnowTransfer('TOKEN');
     * let fileData = fs.readFileSync('new_avatar.png') // You should probably use fs.readFile, since it's asynchronous, synchronous methods may lag your bot.
     * let updateData = {
     *   avatar: `data:image/png;base64,${fileData.toString('base64')}` // base64 data url: data:mimetype;base64,base64String
     * }
     * client.user.updateSelf(updateData)
     */
    async updateSelf(data) {
        return this.requestHandler.request(Endpoints_1.default.USER('@me'), 'patch', 'json', data);
    }
    /**
     * Get guilds of the current user
     * @returns {Promise.<Guild[]>} Array of [partial guild objects](https://discordapp.com/developers/docs/resources/guild#guild-object)
     */
    async getGuilds() {
        return this.requestHandler.request(Endpoints_1.default.USER_GUILDS('@me'), 'get', 'json');
    }
    /**
     * Leave a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    async leaveGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.USER_GUILD('@me', guildId), 'delete', 'json');
    }
    /**
     * Get direct messages of a user
     *
     * **Returns an empty array for bots**
     * @returns {Promise.<Channel[]>} Array of [dm channels](https://discordapp.com/developers/docs/resources/channel#channel-object)
     */
    async getDirectMessages() {
        return this.requestHandler.request(Endpoints_1.default.USER_CHANNELS('@me'), 'get', 'json');
    }
    /**
     * Create a direct message channel with another user
     *
     * **You can not create a dm with another bot**
     * @param {String} userId - Id of the user to create the direct message channel with
     * @returns {Promise.<Channel>} [DM channel](https://discordapp.com/developers/docs/resources/channel#channel-object)
     *
     * @example
     * // Create a dm channel and send "hi" to it
     * let client = new SnowTransfer('TOKEN');
     * let channel = await client.user.createDirectMessageChannel('other user id')
     * client.channel.createMessage(channel.id, 'hi')
     */
    async createDirectMessageChannel(userId) {
        return this.requestHandler.request(Endpoints_1.default.USER_CHANNELS('@me'), 'post', 'json', { recipient_id: userId });
    }
}
/**
 * @typedef {Object} User
 * @property {String} id - Id of the user
 * @property {String} username - username of the user
 * @property {String} discriminator - 4 digit long discord tag
 * @property {String} avatar - avatar hash of the user
 */
/**
 * @typedef {User} SelfUser
 * @property {Boolean} bot - if the user is a bot
 * @property {Boolean} mfa_enabled - if the user has mfa enabled
 * @property {Boolean} verified - if the user is verified
 * @property {String} email - email of the user
 */
exports.default = UserMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvbWV0aG9kcy9Vc2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFxQztBQUlyQzs7R0FFRztBQUNILE1BQU0sV0FBVztJQUliOzs7Ozs7O09BT0c7SUFDSCxZQUFZLGNBQTZCO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFjO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLElBQTRDO1FBQ3pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZTtRQUM1QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLDBCQUEwQixDQUFDLE1BQWM7UUFDM0MsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDL0csQ0FBQztDQUNKO0FBRUQ7Ozs7OztHQU1HO0FBRUg7Ozs7OztHQU1HO0FBQ0gsa0JBQWUsV0FBVyxDQUFDIn0=