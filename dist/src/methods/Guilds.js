"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for interacting with Guilds
 */
class GuildMethods {
    /**
     * Create a new Guild Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.guild.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Create a new Guild, **limited to 10 guilds (you may create more if you are whitelisted)**
     * Check the [discord docs](https://discordapp.com/developers/docs/resources/guild#create-guild) for more infos
     * @param {Object} data - data
     * @param {String} data.name - name of the guild
     * @param {String} [data.region] - [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-voice-region-structure)
     * @param {String} [data.icon] - base64 encoded jpeg icon to use for the guild
     * @param {Number} [data.verification_level] - guild [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level)
     * @param {Number} [data.default_message_notifications] - default message [notification setting](https://discordapp.com/developers/docs/resources/guild#default-message-notification-level)
     * @param {Channel[]} [data.channels] - array of [channels](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     * @param {Role[]} [data.roles] - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     * @returns {Promise.<Guild>} [Guild](https://discordapp.com/developers/docs/resources/guild#guild-object)
     *
     * @example
     * // Creates a simple guild with the name "Demo Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Demo Guild'
     * }
     * client.guild.createGuild(guildData)
     */
    async createGuild(data) {
        return this.requestHandler.request(Endpoints_1.default.GUILDS, 'post', 'json', data);
    }
    /**
     * Get a guild via Id
     *
     * **Your bot has to be a member of the guild for this function to work**
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Guild>} [Guild object](https://discordapp.com/developers/docs/resources/guild#guild-object)
     */
    async getGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), 'get', 'json');
    }
    /**
     * Update a guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - data
     * @param {String} [data.name] - name of the guild
     * @param {String} [data.region] - guild [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-voice-region-structure) Id
     * @param {Number} [data.verification_level] - guild [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level)
     * @param {Number} [data.default_message_notifications] - message [notification setting](https://discordapp.com/developers/docs/resources/guild#default-message-notification-level)
     * @param {String} [data.afk_channel_id] - Id of the afk channel
     * @param {Number} [data.afk_timeout] - afk timeout in seconds
     * @param {String} [data.icon] - base64 jpeg image of the guild icon
     * @param {String} [data.owner_id] - Id of the owner user
     * @param {String} [data.splash] - base64 jpeg image for the guild splash (vip/partner only)
     * @returns {Promise.<Guild>} [Guild object](https://discordapp.com/developers/docs/resources/guild#guild-object)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     *
     * @example
     * // Update the name of a guild to "Nice Guild"
     * let client = new SnowTransfer('TOKEN')
     * let guildData = {
     *   name: 'Nice Guild'
     * }
     * client.guild.updateGuild('guild Id', guildData)
     */
    async updateGuild(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), 'patch', 'json', data);
    }
    /**
     * Delete a guild
     *
     * **Your bot has to be the owner of the guild to do this**
     *
     * **This action is irreversible, so use it with caution!**
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    async deleteGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD(guildId), 'delete', 'json');
    }
    /**
     * Get a list of channels for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Channel[]>} - list of [channels](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     */
    async getGuildChannels(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), 'get', 'json');
    }
    /**
     * Create a channel within a guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - channel properties
     * @param {String} data.name - name of the channel
     * @param {Number} [data.type] - [type](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-types) of the channel
     * @param {Number} [data.bitrate] - bitrate of the channel (voice only)
     * @param {Number} [data.user_limit] - user limit of a channel (voice only)
     * @param {PermissionOverwrite[]} [data.permission_overwrites] - permissions overwrites for the channel
     * @returns {Promise.<Channel>} [channel object](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
     |--------------------|-----------:|
     | MANAGE_CHANNELS    | always    |
     */
    async createGuildChannel(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), 'post', 'json', data);
    }
    /**
     * Batch update the positions of channels
     * @param {String} guildId - Id of the guild
     * @param {Object[]} data
     * @param {String} data[].id - Id of the channel
     * @param {Number} data[].position - new position of the channel
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     */
    async updateChannelPositions(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_CHANNELS(guildId), 'patch', 'json', data);
    }
    /**
     * Get a guild member via Id
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @returns {Promise.<GuildMember>} - [guild member](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    async getGuildMember(guildId, memberId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), 'get', 'json');
    }
    /**
     * Get a list of guild members
     * @param {String} guildId - Id of the guild
     * @param {Object} [data] - query data
     * @param {Number} [data.limit] - how many results should be returned
     * @param {String} [data.after] - highest user Id after which results should be returned
     * @returns {Promise.<GuildMember[]>} - list of [guild members](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     */
    async getGuildMembers(guildId, data = {}) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBERS(guildId), 'get', 'json', data);
    }
    /**
     * Add a guild member to a guild via oauth2 access token
     *
     * **You need the oauth2 `guilds.join` scope granted to the access_token**
     *
     *
     * **Your bot has to be a member of the guild you want to add the user to**
     *
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} data - object containing the needed request data
     * @param {String} data.access_token - oauth2 access token with a `guilds.join` scope enabled
     * @param {String} [data.nick] - nickname of the new member
     * @param {String[]} [data.roles] - Array of Role Ids the new member should have
     * @param {Boolean} [data.mute] - if the new member should be muted
     * @param {Boolean} [data.deaf] - if the new member is deaf
     * @returns {Promise.<GuildMember>} - [guild member](https://discordapp.com/developers/docs/resources/guild#guild-member-object-guild-member-structure)
     *
     * | Permissions needed    | condition |
     |-----------------------|----------:|
     | CREATE_INSTANT_INVITE |    always |
     *
     * | OAUTH2 Scopes |
     |---------------|
     | guilds.join   |
     *
     * @example
     * // add a user to a server
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   access_token: 'access token of a user with the guilds.join scope'
     * }
     * client.guild.addGuildMember('guildId', 'memberId', memberData)
     */
    async addGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), 'put', 'json', data);
    }
    /**
     * Update properties of a guild member
     *
     * **Check the table below to make sure you have the right permissions for the types of updates**
     *
     * **Make sure that your bot has `CONNECT` and `MOVE_MEMBERS` on the channel you want to move the member to**
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} data - Updated properties
     * @param {String} [data.nick] - updated nickname of the member (MANAGE_NICKNAMES)
     * @param {String[]} [data.roles] - Array of Role Ids the member should have (MANAGE_ROLES)
     * @param {Boolean} [data.mute] - if the member should be muted (MUTE_MEMBERS)
     * @param {Boolean} [data.deaf] - if the member is deaf (DEAFEN_MEMBERS)
     * @param {String} [data.channel_id] - channel to move the member to (if connected to voice) (CONNECT and MOVE_MEMBERS)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed |    condition |
     |--------------------|-------------:|
     | MANAGE_NICKNAMES   | Nick Updates |
     | MANAGE_ROLES       | Role Updates |
     | MUTE_MEMBERS       | Mute Updates |
     | DEAFEN_MEMBERS     | Deaf Updates |
     | MOVE_MEMBERS       | Voice Move   |
     *
     * @example
     * // Reset the nickname of a guild member
     * let client = new SnowTransfer('TOKEN')
     * let memberData = {
     *   nick: "" // You can reset nicknames by providing an empty string as the value of data.nick
     * }
     * client.guild.updateGuildMember('guild Id', 'memberId', memberData)
     */
    async updateGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), 'patch', 'json', data);
    }
    /**
     * Update the nick of the current user
     * @param {String} guildId - Id of the guild
     * @param {Object} data - object with a nick property
     * @param {String} data.nick - new nickname to use
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | CHANGE_NICKNAME    |    always |
     *
     * @example
     * // change nick of bot to "Nice Nick"
     * let client = new SnowTransfer('TOKEN')
     * let nickData = {
     *   nick: 'Nice Nick'
     * }
     * client.guild.updateSelf('guildId', nickData)
     */
    async updateSelf(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_NICK(guildId, '@me'), 'patch', 'json', data);
    }
    /**
     * Add a role to a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async addGuildMemberRole(guildId, memberId, roleId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_ROLE(guildId, memberId, roleId), 'put', 'json');
    }
    /**
     * Remove a role from a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async removeGuildMemberRole(guildId, memberId, roleId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER_ROLE(guildId, memberId, roleId), 'delete', 'json');
    }
    /**
     * Remove a guild member (aka kick them)
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with reason property
     * @param {String} [data.reason] - Audit log reason for the remove
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     *| Permissions needed | condition |
     |--------------------|----------:|
     | KICK_MEMBERS       |    always |
     *
     * @example
     * // Kick a member with a reason of "spam"
     * let client = new SnowTransfer('TOKEN')
     * let kickData = {
     *   reason: 'spam'
     * }
     * client.guild.removeGuildMember('guild Id', 'memberId', kickData)
     */
    async removeGuildMember(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_MEMBER(guildId, memberId), 'delete', 'json', data);
    }
    /**
     * Get bans of a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Ban[]>} - List of [bans](https://discordapp.com/developers/docs/resources/guild#ban-object-ban-structure)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | BAN_MEMBERS        |    always |
     */
    async getGuildBans(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_BANS(guildId), 'get', 'json');
    }
    /**
     * Ban a guild member
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with a reason and a delete-message-days property
     * @param {String} [data.reason] - Audit log reason for the ban
     * @param {Number} [data.delete-message-days] - Number of Days of messages that should be removed
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | BAN_MEMBERS        |    always |
     *
     * @example
     * // Ban a user with a reason and delete the last 2 days of his messages
     * let client = new SnowTransfer('TOKEN')
     * let banData = {
     *   reason: 'Memes were not good enough',
     *   "delete-message-days":2
     * }
     * client.guild.createGuildBan('guild Id', 'memberId', banData)
     */
    async createGuildBan(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_BAN(guildId, memberId), 'put', 'json', data);
    }
    /**
     * Remove a ban of a user
     * @param {String} guildId - Id of the guild
     * @param {String} memberId - Id of the guild member
     * @param {Object} [data] - object with a reason property
     * @param {String} [data.reason] - Audit log reason for the remove of the ban
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | BAN_MEMBERS        |    always |
     */
    async removeGuildBan(guildId, memberId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_BAN(guildId, memberId), 'delete', 'json', data);
    }
    /**
     * Get a list of roles for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Role[]>} - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async getGuildRoles(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), 'get', 'json');
    }
    /**
     * Create a new Role
     * @param {String} guildId - Id of the guild
     * @param {Object} [data] - data with role properties
     * @param {String} [data.name] - name of the role
     * @param {Number} [data.permissions] - Number created from combining permission bits
     * @param {Number} [data.color] - rgb color of the role
     * @param {Boolean} [data.hoist] - if the role should be displayed in the sidebar
     * @param {Boolean} [data.mentionable] - if the role should be mentionable
     * @returns {Promise<Role>} [role](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     *
     * @example
     * // Create a role with the name "Nice Role" and a color of a soft blue
     * let client = new SnowTransfer('TOKEN')
     * let roleData = {
     *   name: 'Nice Role',
     *   color: 0x7c7cf8
     * }
     * client.guild.createGuildRole('guild Id', roleData)
     */
    async createGuildRole(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), 'post', 'json', data);
    }
    /**
     * Batch modify the positions of roles
     * @param {String} guildId - Id of the guild
     * @param {Object[]} data - Array of objects with id and position properties
     * @param {String} data[].id - Id of the role
     * @param {Number} data[].position - new position of the role
     * @returns {Promise.<Role[]>} - array of [roles](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async updateGuildRolePositions(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLES(guildId), 'put', 'json', data);
    }
    /**
     * Update a guild role
     * @param {String} guildId - Id of the guild
     * @param {String} roleId - Id of the role
     * @param {Object} data - updated properties of the role
     * @param {String} [data.name] - new name of the role
     * @param {Number} [data.permissions] - updated permission bit-set
     * @param {Number} [data.color] - rgb color of the role
     * @param {Boolean} [data.hoist] - if the role should be displayed in the sidebar
     * @param {Boolean} [data.mentionable] - if the role should be mentionable
     * @returns {Promise.<Role>} [Updated Role](https://discordapp.com/developers/docs/resources/channel#channel-object-channel-structure)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async updateGuildRole(guildId, roleId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLE(guildId, roleId), 'patch', 'json', data);
    }
    /**
     * Delete a role from the guild
     * @param {String} guildId - Id of the guild
     * @param {String} roleId - Id of the role
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_ROLES       |    always |
     */
    async removeGuildRole(guildId, roleId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_ROLE(guildId, roleId), 'delete', 'json');
    }
    /**
     * Get the amount of members that would be pruned when a prune with the passed amount of days would be started
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Object with a days property
     * @param {Number} data.days - days to count prune for (min 1)
     * @returns {Promise.<Object>} - Object with a "pruned" key indicating the amount of members that would be pruned
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | KICK_MEMBERS       |    always |
     */
    async getGuildPruneCount(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_PRUNE(guildId), 'get', 'json', data);
    }
    /**
     * Start a prune
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Object with a days property
     * @param {Number} data.days - days to count prune for (min 1)
     * @returns {Promise.<Object>} Object with a "pruned" key indicating the amount of members that were be pruned
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | KICK_MEMBERS       |    always |
     */
    async startGuildPrune(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_PRUNE(guildId), 'post', 'json', data);
    }
    /**
     * Get a list of voice regions for the guild, includes vip-regions unlike voice.getVoiceRegions
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<VoiceRegion[]>} List of [voice regions](https://discordapp.com/developers/docs/resources/voice#voice-region-object)
     */
    async getGuildVoiceRegions(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_VOICE_REGIONS(guildId), 'get', 'json');
    }
    /**
     * Get invites for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Invite[]>} List of [invites](https://discordapp.com/developers/docs/resources/invite#invite-object) (with metadata)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async getGuildInvites(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INVITES(guildId), 'get', 'json');
    }
    /**
     * Get integrations for a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object[]>} List of [integration objects](https://discordapp.com/developers/docs/resources/guild#integration-object)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async getGuildIntegrations(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATIONS(guildId), 'get', 'json');
    }
    /**
     * Attach a integration object from the user to the guild
     * @param {String} guildId - Id of the guild
     * @param {Object} data - Integration object with id and type properties
     * @param {String} data.type - type of the integration
     * @param {String} data.id - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async createGuildIntegration(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATIONS(guildId), 'post', 'json', data);
    }
    /**
     * Update behaviour and settings of an [integration object](https://discordapp.com/developers/docs/resources/guild#integration-object)
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @param {Object} data - Data with the properties listed below
     * @param {Number} data.expire_behaviour - Behaviour when a integration subscription expires
     * @param {Number} data.expire_grace_period - Time in seconds for how long to ignore expired subscriptions
     * @param {Boolean} data.enable_emoticons - If emoticons should be synced for this integration (twitch only atm)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async updateGuildIntegration(guildId, integrationId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), 'patch', 'json', data);
    }
    /**
     * Delete a guild integratiom
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async removeGuildIntegration(guildId, integrationId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), 'delete', 'json');
    }
    /**
     * Synchronize a guild integration
     * @param {String} guildId - Id of the guild
     * @param {String} integrationId - Id of the integration
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async syncGuildIntegration(guildId, integrationId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_INTEGRATION(guildId, integrationId), 'delete', 'json');
    }
    /**
     * Get the guild embed object
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object>} [Guild Embed](https://discordapp.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async getGuildEmbed(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMBED(guildId), 'get', 'json');
    }
    /**
     * Update a guild embed object
     * @param {String} guildId - Id of the guild
     * @param {Object} data - data
     * @param {Boolean} data.enabled - if the embed is enabled
     * @param {String} data.channel_id - channel Id of the embed
     * @returns {Promise.<Object>} - [Guild Embed](https://discordapp.com/developers/docs/resources/guild#guild-embed-object)
     *
     * | Permissions needed | condition |
     |--------------------|----------:|
     | MANAGE_GUILD       |    always |
     */
    async updateGuildEmbed(guildId, data) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_EMBED(guildId), 'patch', 'json', data);
    }
}
/**
 * @typedef {Object} Guild
 * @property {String} id - guild Id
 * @property {String} name - guild name
 * @property {String} icon - icon hash
 * @property {String} splash - splash image hash
 * @property {String} owner_id - Id of the owner
 * @property {String} region - Id of the voice region
 * @property {String} afk_channel_id - Id of the afk channel
 * @property {Number} afk_timeout - afk timeout in seconds
 * @property {Boolean} embed_enabled - if the guild is embeddable
 * @property {String} embed_channel_id - Id of embedded channel
 * @property {Number} verification level - [verification level](https://discordapp.com/developers/docs/resources/guild#guild-object-verification-level) of the guild
 * @property {Number} default_message_notifications - default
 * [notification level](https://discordapp.com/developers/docs/resources/guild#guild-object-default-message-notification-level) of the guild
 * @property {Number} explicit_content_filter - default [filter level](https://discordapp.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)
 * @property {Role[]} roles - Array of roles
 * @property {Emoji[]} emojis - Array of emojis
 * @property {String[]} features - Array of enabled guild features
 * @property {Number} mfa_level - required [mfa level](https://discordapp.com/developers/docs/resources/guild#guild-object-mfa-level) for the guild
 * @property {String} [application_id] - application Id of the guild creator, if the guild was created by a bot
 * @property {Boolean} widget_enabled - if the server widget is enabled
 * @property {String} widget_channel_id - channel Id of the server widget
 */
/**
 * @typedef {Object} Role
 * @property {String} id - role Id
 * @property {String} name - role name
 * @property {Number} color - integer representation of hexadecimal color code
 * @property {Boolean} hoist - if this role is hoisted
 * @property {Number} position - position of the role
 * @property {Number} permissions - permission bit set
 * @property {Boolean} managed - if this role is managed by an integration
 * @property {Boolean} mentionable - if this role can be mentioned
 */
/**
 * @typedef {Object} GuildMember
 * @property {User} user - user belonging to the member
 * @property {?String} nick - nickname if the member has one
 * @property {String[]} roles - array of role ids
 * @property {String} joined_at - timestamp when the user joined the guild
 * @property {Boolean} deaf - if the user is deafened
 * @property {Boolean} mute - if the user is muted
 */
/**
 * @typedef {Object} Ban
 * @property {?String} reason - reason of the ban
 * @property {User} user - user that was banned
 */
// those moves https://youtu.be/oCrwzN6eb4Q?t=51s nice
exports.default = GuildMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL21ldGhvZHMvR3VpbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXFDO0FBSXJDOztHQUVHO0FBQ0gsTUFBTSxZQUFZO0lBSWQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksY0FBOEI7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBZTtRQUMxQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMEJHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsSUFBOEw7UUFDN04sT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZTtRQUM3QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENB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