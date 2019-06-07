"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for handling webhook interactiong
 */
class WebhookMethods {
    /**
     * Create a new Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.webhook.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Create a new Webhook
     * @param {String} channelId - Id of the channel
     * @param {Object} data - Object with webhook properties
     * @param {String} data.name - name of the webhook
     * @param {String} [data.avatar] - base 64 encoded avatar
     * @returns {Promise.<Object>} [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
     |--------------------|-----------:|
     | MANAGE_WEBHOOKS    | always    |
     *
     * @example
     * // Create a new Webhook with the name "Webby Webhook"
     * let client = new SnowTransfer('TOKEN');
     * let webhookData = {
     *   name: "Webby Webhook"
     * }
     * client.webhook.createWebhook('channel Id', webhookData)
     */
    async createWebhook(channelId, data) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_WEBHOOKS(channelId), 'post', 'json', data);
    }
    /**
     * Get webhooks created within a channel
     * @param {String} channelId - Id of the channel
     * @returns {Promise.<Object[]>} Array of [Webhook Objects](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
     |--------------------|-----------:|
     | MANAGE_WEBHOOKS    | always    |
     */
    async getWebhooksChannel(channelId) {
        return this.requestHandler.request(Endpoints_1.default.CHANNEL_WEBHOOKS(channelId), 'get', 'json');
    }
    /**
     * Get all webhooks within a guild
     * @param {String} guildId - Id of the guild
     * @returns {Promise.<Object>} Array of [Webhook Objects](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
     |--------------------|-----------:|
     | MANAGE_WEBHOOKS    | always    |
     */
    async getWebhooksGuild(guildId) {
        return this.requestHandler.request(Endpoints_1.default.GUILD_WEBHOOKS(guildId), 'get', 'json');
    }
    /**
     * Get a single Webhook via Id
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @returns {Promise.<Object>} [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
     |--------------------|---------------:|
     | MANAGE_WEBHOOKS    | without token |
     */
    async getWebhook(webhookId, token) {
        if (token) {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'get', 'json');
        }
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), 'get', 'json');
    }
    /**
     * Update a webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @param {Object} data - Updated Webhook properties
     * @param {String} [data.name] - New default name of the webhook
     * @param {String} [data.avatar] - Updated base 64 image for the default avatar
     * @param {String} [data.channel_id] - Id of the new channel of the webhook
     * @returns {Promise.<Object>} Updated [Webhook Object](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure)
     *
     * | Permissions needed | condition |
     |--------------------|---------------:|
     | MANAGE_WEBHOOKS    | without token |
     */
    async updateWebhook(webhookId, token, data) {
        if (token) {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'patch', 'json', data);
        }
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), 'patch', 'json', data);
    }
    /**
     * Delete a Webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} [token] - Webhook token
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     *
     * | Permissions needed | condition |
     |--------------------|---------------:|
     | MANAGE_WEBHOOKS    | without token |
     */
    async deleteWebhook(webhookId, token) {
        if (token) {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'delete', 'json');
        }
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK(webhookId), 'delete', 'json');
    }
    /**
     * Send a message via Webhook
     * @param {String} webhookId - Id of the webhook
     * @param {String} token - webhook token
     * @param {Object} data - Webhook data to send
     * @param {String} [data.content] - content of the message
     * @param {?String} [data.username] - username to use for the webhook
     * @param {?String} [data.avatar_url] - avatar url of the webhook
     * @param {?Boolean} [data.tts] - send a text to speech message
     * @param {Object} [data.file] - File, that should be uploaded
     * @param {String} [data.file.name] - Name of the file
     * @param {File} [data.file.file] - Buffer with file contents
     * @param {Object[]} [data.embeds] - Array of [embed objects](https://discordapp.com/developers/docs/resources/channel#embed-object)
     * @returns {Promise.<void>} Resolves the Promise on successful execution
     * @example
     * // Send a message saying "Hi from my webhook" with a previously created webhook
     * let client = new SnowTransfer('TOKEN');
     * client.webhook.executeWebhook('webhook Id', 'webhook token', {content: 'Hi from my webhook'})
     */
    async executeWebhook(webhookId, token, data) {
        if (typeof data !== 'string' && !data.content && !data.embeds && !data.file) {
            throw new Error('Missing content or embed');
        }
        if (typeof data === 'string') {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'post', 'json', { content: data });
        }
        else if (data.file) {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'post', 'multipart', data);
        }
        else {
            return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN(webhookId, token), 'post', 'json', data);
        }
    }
    /**
     * Execute a slack style Webhook
     * @param {String} webhookId - Id of the Webhook
     * @param {String} token - Webhook token
     * @param {Object} data - Check [Slack's documentation](https://api.slack.com/incoming-webhooks)
     * @returns {Promise<void>} Resolves the Promise on successful execution
     */
    async executeWebhookSlack(webhookId, token, data) {
        return this.requestHandler.request(Endpoints_1.default.WEBHOOK_TOKEN_SLACK(webhookId, token), 'post', 'json', data);
    }
}
exports.default = WebhookMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9va3MuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvbWV0aG9kcy9XZWJob29rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUFxQztBQUlyQzs7R0FFRztBQUNILE1BQU0sY0FBYztJQUloQjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxjQUE4QjtRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsSUFBcUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFNBQWlCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQWU7UUFDbEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBaUIsRUFBRSxLQUFhO1FBQzdDLElBQUksS0FBSyxFQUFFO1lBQ1AsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLGFBQWEsQ0FB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