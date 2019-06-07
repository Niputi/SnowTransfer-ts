"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestHandler_1 = require("./RequestHandler");
const Ratelimiter_1 = require("./Ratelimiter");
const Endpoints_1 = require("./Endpoints");
const AuditLog_1 = require("./methods/AuditLog");
const Bots_1 = require("./methods/Bots");
const package_json_1 = require("../package.json");
const Channels_1 = require("./methods/Channels");
const Users_1 = require("./methods/Users");
const Emojis_1 = require("./methods/Emojis");
const Webhooks_1 = require("./methods/Webhooks");
const Invites_1 = require("./methods/Invites");
const Guilds_1 = require("./methods/Guilds");
const Voices_1 = require("./methods/Voices");
const node_1 = require("@sentry/node");
class SnowTransfer {
    /**
     * Create a new Rest Client
     * @property {ChannelMethods} channel - Methods for channels
     * @property {UserMethods} user - Methods for users
     * @property {EmojiMethods} emoji - Methods for emojis
     * @property {WebhookMethods} webhook - Methods for webhooks
     * @property {GuildMethods} guild - Methods for guilds
     * @property {InviteMethods} invite - Methods for invites
     * @property {VoiceMethods} voice - Methods for voice
     * @property {BotMethods} bot - Methods for bot related things (e.g. Gateway endpoint)
     * @property {AuditLogMethods} auditLog - Methods for accessing the audit log of a guild
     * @property {Raven|null} [raven] - optional [sentry raven](https://docs.sentry.io/clients/node/config/) instance used for catching errors
     * @param {String} token - Discord Bot token to use
     * @param {Object} [options] - options
     * @param {String} [options.sentryDsn] - Dsn to use for the sentry integration, disables the integration when empty
     * @param {Object} [options.sentryOptions] - Options to use for the sentry client, check the [sentry docs](https://docs.sentry.io/clients/node/config/) for more infos
     * @param {String} [options.baseHost=https://discordapp.com] - Base host to use for the requests, may be replaced when using a local hosted proxy
     * @return {SnowTransfer} - created instance
     * @constructor
     */
    constructor(token, options = {}) {
        if (!token || token === '') {
            throw new Error('Missing token');
        }
        if (!token.startsWith('Bot')) {
            token = `Bot ${token}`;
        }
        this.token = token;
        this.sentry = null;
        this.options = options;
        if (this.options.sentryDsn) {
            this.sentry = new node_1.NodeClient({ dsn: this.options.sentryDsn, release: package_json_1.version });
        }
        this.ratelimiter = new Ratelimiter_1.default();
        this.requestHandler = new RequestHandler_1.default(this.ratelimiter, {
            token: this.token,
            sentry: this.sentry,
            baseHost: this.options.baseHost || Endpoints_1.default.BASE_HOST
        });
        this.channel = new Channels_1.default(this.requestHandler);
        this.user = new Users_1.default(this.requestHandler);
        this.emoji = new Emojis_1.default(this.requestHandler);
        this.webhook = new Webhooks_1.default(this.requestHandler);
        this.guild = new Guilds_1.default(this.requestHandler);
        this.invite = new Invites_1.default(this.requestHandler);
        this.voice = new Voices_1.default(this.requestHandler);
        this.bot = new Bots_1.default(this.requestHandler);
        this.auditLog = new AuditLog_1.default(this.requestHandler);
    }
}
exports.default = SnowTransfer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU25vd1RyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL1Nub3dUcmFuc2Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUE4QztBQUM5QywrQ0FBd0M7QUFDeEMsMkNBQW9DO0FBQ3BDLGlEQUFpRDtBQUNqRCx5Q0FBd0M7QUFDeEMsa0RBQTBDO0FBQzFDLGlEQUFnRDtBQUNoRCwyQ0FBMEM7QUFDMUMsNkNBQTRDO0FBQzVDLGlEQUFnRDtBQUNoRCwrQ0FBOEM7QUFDOUMsNkNBQTRDO0FBQzVDLDZDQUEyQztBQUMzQyx1Q0FBa0Q7QUFNbEQsTUFBTSxZQUFZO0lBZ0JkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBQ0gsWUFBWSxLQUFhLEVBQUUsVUFBb0IsRUFBRTtRQUM3QyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLEtBQUssR0FBRyxPQUFPLEtBQUssRUFBRSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQU0sQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsc0JBQU8sRUFBQyxDQUFDLENBQUM7U0FDN0U7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscUJBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSx3QkFBYyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDdkQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksbUJBQVMsQ0FBQyxTQUFTO1NBQ3pELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxrQkFBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZ0JBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGtCQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxnQkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGdCQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxjQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxZQUFZLENBQUMifQ==