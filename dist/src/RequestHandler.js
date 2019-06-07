"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Endpoints_1 = require("./Endpoints");
const package_json_1 = require("../package.json");
const form_data_1 = require("form-data");
/**
 * Request Handler class
 * @private
 */
class RequestHandler {
    /**
     * Create a new request handler
     * @param {Ratelimiter} ratelimiter - ratelimiter to use for ratelimiting requests
     * @param {Object} options - options
     * @param {String} options.token - token to use for calling the rest api
     * @constructor
     * @private
     */
    constructor(ratelimiter, options) {
        this.ratelimiter = ratelimiter;
        this.options = { baseHost: Endpoints_1.default.BASE_HOST, baseURL: Endpoints_1.default.BASE_URL };
        Object.assign(this.options, options);
        this.client = axios_1.default.create({
            baseURL: this.options.baseHost + Endpoints_1.default.BASE_URL,
            headers: {
                Authorization: options.token,
                'User-Agent': `DiscordBot (https://github.com/DasWolke/SnowTransfer, ${package_json_1.version})`
            }
        });
        this.sentry = options.sentry ? options.sentry : null;
        this.latency = 500;
        this.remaining = {};
        this.reset = {};
        this.limit = {};
    }
    /**
     * Request a route from the discord api
     * @param {String} endpoint - endpoint to request
     * @param {String} method - http method to use
     * @param {String} [dataType=json] - type of the data being sent
     * @param {Object} [data] - data to send, if any
     * @param {Number} [attempts=0] - Number of attempts of the current request
     * @returns {Promise.<Object>} - Result of the request
     * @protected
     */
    request(endpoint, method, dataType = 'json', data = {}, attempts = 0) {
        return new Promise(async (res, rej) => {
            this.ratelimiter.queue(async (bkt) => {
                let request;
                let latency = Date.now();
                try {
                    switch (dataType) {
                        case 'json':
                            request = await this._request(endpoint, method, data, (method === 'get' || endpoint.includes('/bans') || endpoint.includes('/prune')));
                            break;
                        case 'multipart':
                            request = await this._multiPartRequest(endpoint, method, data);
                            break;
                        default:
                            break;
                    }
                    this.latency = Date.now() - latency;
                    //@ts-ignore
                    let offsetDate = this._getOffsetDateFromHeader(request.headers['date']);
                    //@ts-ignore
                    this._applyRatelimitHeaders(bkt, request.headers, offsetDate, endpoint.endsWith('/reactions/:id'));
                    //@ts-ignore
                    if (request.data) {
                        //@ts-ignore
                        return res(request.data);
                    }
                    return res();
                }
                catch (error) {
                    if (this.sentry) {
                        this.sentry.captureException(error);
                    }
                    if (attempts === 3) {
                        return rej({ error: 'Request failed after 3 attempts', request: error });
                    }
                    if (error.response) {
                        let offsetDate = this._getOffsetDateFromHeader(error.response.headers['date']);
                        if (error.response.status === 429) {
                            //TODO WARN ABOUT THIS :< either bug or meme
                            this._applyRatelimitHeaders(bkt, error.response.headers, offsetDate, endpoint.endsWith('/reactions/:id'));
                            return this.request(endpoint, method, dataType, data, attempts ? ++attempts : 1);
                        }
                        if (error.response.status === 502) {
                            return this.request(endpoint, method, dataType, data, attempts ? ++attempts : 1);
                        }
                    }
                    return rej(error);
                }
            }, endpoint, method);
        });
    }
    /**
     * Calculate the time difference between the local server and discord
     * @param {String} dateHeader - Date header value returned by discord
     * @returns {number} - Offset in milliseconds
     * @private
     */
    _getOffsetDateFromHeader(dateHeader) {
        let discordDate = Date.parse(dateHeader);
        let offset = Date.now() - discordDate;
        return Date.now() + offset;
    }
    /**
     * Apply the received ratelimit headers to the ratelimit bucket
     * @param {LocalBucket} bkt - Ratelimit bucket to apply the headers to
     * @param {Object} headers - Http headers received from discord
     * @param {Number} offsetDate - Unix timestamp of the current date + offset to discord time
     * @param {Boolean} reactions - Whether to use reaction ratelimits (1/250ms)
     * @private
     */
    _applyRatelimitHeaders(bkt, headers, offsetDate, reactions = false) {
        //@ts-ignore
        if (headers['x-ratelimit-global']) {
            bkt.ratelimiter.global = true;
            //@ts-ignore
            bkt.ratelimiter.globalReset = parseInt(headers['retry_after']);
        }
        //@ts-ignore
        if (headers['x-ratelimit-reset']) {
            //@ts-ignore
            let reset = (headers['x-ratelimit-reset'] * 1000) - offsetDate;
            if (reactions) {
                bkt.reset = Math.max(reset, 250);
            }
            else {
                bkt.reset = reset;
            }
        }
        //@ts-ignore
        if (headers['x-ratelimit-remaining']) {
            //@ts-ignore
            bkt.remaining = parseInt(headers['x-ratelimit-remaining']);
        }
        else {
            bkt.remaining = 1;
        }
        //@ts-ignore
        if (headers['x-ratelimit-limit']) {
            //@ts-ignore
            bkt.limit = parseInt(headers['x-ratelimit-limit']);
        }
    }
    /**
     * Execute a normal json request
     * @param {String} endpoint - Endpoint to use
     * @param {String} method - Http Method to use
     * @param {Object} data - Data to send
     * @param {Boolean} useParams - Whether to send the data in the body or use query params
     * @returns {Promise<Object>} - Result of the request
     * @private
     */
    async _request(endpoint, method, data, useParams = false) {
        let headers = {};
        //@ts-ignore
        if (data.reason) {
            //@ts-ignore
            headers['X-Audit-Log-Reason'] = data.reason;
            //@ts-ignore
            delete data.reason;
        }
        if (useParams) {
            return this.client({ url: endpoint, method, params: data, headers });
        }
        else {
            return this.client({ url: endpoint, method, data, headers });
        }
    }
    /**
     * Execute a multipart/form-data request
     * @param {String} endpoint - Endpoint to use
     * @param {String} method - Http Method to use
     * @param {Object} data - data to send
     * @param {Object} [data.file] - file to attach
     * @param {String} [data.file.name] - name of the file
     * @param {Buffer} [data.file.file] - Buffer with the file content
     * @returns {Promise.<Object>} - Result of the request
     * @private
     */
    async _multiPartRequest(endpoint, method, data) {
        let formData = new form_data_1.default();
        if (data.file.file) {
            if (data.file.name) {
                formData.append('file', data.file.file, { filename: data.file.name });
            }
            else {
                formData.append('file', data.file.file);
            }
            delete data.file.file;
        }
        formData.append('payload_json', JSON.stringify(data));
        // :< axios is mean sometimes
        return this.client({
            url: endpoint,
            method,
            data: formData,
            //@ts-ignore
            headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
        });
    }
}
exports.default = RequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvUmVxdWVzdEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBcUQ7QUFJckQsMkNBQW9DO0FBQ3BDLGtEQUEwQztBQUMxQyx5Q0FBaUM7QUFRakM7OztHQUdHO0FBQ0gsTUFBTSxjQUFjO0lBYWhCOzs7Ozs7O09BT0c7SUFDSCxZQUFZLFdBQXdCLEVBQUUsT0FBaUI7UUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFDLFFBQVEsRUFBRSxtQkFBUyxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsbUJBQVMsQ0FBQyxRQUFRLEVBQUMsQ0FBQztRQUM1RSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxtQkFBUyxDQUFDLFFBQVE7WUFDbkQsT0FBTyxFQUFFO2dCQUNMLGFBQWEsRUFBRSxPQUFPLENBQUMsS0FBSztnQkFDNUIsWUFBWSxFQUFFLHlEQUF5RCxzQkFBTyxHQUFHO2FBQ3BGO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FB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