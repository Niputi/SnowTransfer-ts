"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for interacting with invites
 */
class InviteMethods {
    /**
     * Create a new Invite Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.invite.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get the invite data on an invite id
     * @param {String} inviteId - Id of the invite
     * @param {Boolean} [withCounts] - When set to true you get an invite object with additional `approximate_presence_count` and `approximate_member_count` fields
     * @returns {Promise.<Invite>} [Invite Object](https://discordapp.com/developers/docs/resources/invite#invite-object)
     */
    async getInvite(inviteId, withCounts) {
        return this.requestHandler.request(Endpoints_1.default.INVITE(inviteId), 'get', 'json', { with_counts: withCounts });
    }
    /**
     * Delete an invite
     * @param {String} inviteId
     * @returns {Promise.<Invite>} [Invite Object](https://discordapp.com/developers/docs/resources/invite#invite-object)
     *
     * | Permissions needed | condition |
     |--------------------|-----------:|
     | MANAGE_CHANNELS    | always    |
     */
    async deleteInvite(inviteId) {
        return this.requestHandler.request(Endpoints_1.default.INVITE(inviteId), 'delete', 'json');
    }
}
/**
 * @typedef {Object} Invite
 * @property {String} code - unique id code of the invite
 * @property {Guild} guild - partial guild object of the invite
 * @property {Channel} channel - partial channel object of the invite
 * @property {User} [inviter] - creator of the invite
 * @property {Number} [uses] - how often the invite was used
 * @property {Number} [max_uses] - how often the invite can be used
 * @property {Number} [max_age] - duration in seconds until the invite expires
 * @property {Boolean} [temporary] - if this invite only grants temporary membership
 * @property {Date} [created_at] - when the invite was created
 * @property {Boolean} [revoked] - if this invite has been revoked
 */
exports.default = InviteMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9tZXRob2RzL0ludml0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBcUM7QUFJckM7O0dBRUc7QUFDSCxNQUFNLGFBQWE7SUFJZjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxjQUE4QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQWdCLEVBQUUsVUFBa0I7UUFDaEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7SUFDN0csQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFnQjtRQUMvQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRixDQUFDO0NBQ0o7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFHSCxrQkFBZSxhQUFhLENBQUMifQ==