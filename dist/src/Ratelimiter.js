"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocalBucket_1 = require("./ratelimitBuckets/LocalBucket");
/**
 * Ratelimiter used for handling the ratelimits imposed by the rest api
 * @protected
 */
class Ratelimiter {
    /**
     * @constructor
     * @protected
     */
    constructor() {
        this.buckets = {};
        this.global = false;
        this.globalReset = 0;
    }
    /**
     * Returns a key for saving ratelimits for routes
     * (Taken from https://github.com/abalabahaha/eris/blob/master/lib/rest/RequestHandler.js) -> I luv u abal <3
     * @param {String} url - url to reduce to a key something like /channels/266277541646434305/messages/266277541646434305/
     * @param {String} method - method of the request, usual http methods like get, etc.
     * @returns {String} - reduced url: /channels/266277541646434305/messages/:id/
     * @protected
     */
    routify(url, method) {
        let route = url.replace(/\/([a-z-]+)\/(?:[0-9]{17,19})/g, function (match, p) {
            return p === 'channels' || p === 'guilds' || p === 'webhooks' ? match : `/${p}/:id`;
        }).replace(/\/reactions\/[^/]+/g, '/reactions/:id').replace(/^\/webhooks\/(\d+)\/[A-Za-z0-9-_]{64,}/, '/webhooks/$1/:token');
        if (method.toUpperCase() === 'DELETE' && route.endsWith('/messages/:id')) { // Delete Messsage endpoint has its own ratelimit
            route = method + route;
        }
        return route;
    }
    /**
     * Queue a rest call to be executed
     * @param {Function} fn - function to call once the ratelimit is ready
     * @param {String} url - Endpoint of the request
     * @param {String} method - Http method used by the request
     * @protected
     */
    queue(fn, url, method) {
        let routeKey = this.routify(url, method);
        //@ts-ignore
        if (!this.buckets[routeKey]) {
            //@ts-ignore
            this.buckets[routeKey] = new LocalBucket_1.default(this);
        }
        //@ts-ignore
        this.buckets[routeKey].queue(fn);
    }
}
exports.default = Ratelimiter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0ZWxpbWl0ZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvUmF0ZWxpbWl0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRUFBeUQ7QUFHekQ7OztHQUdHO0FBQ0gsTUFBTSxXQUFXO0lBT2I7OztPQUdHO0lBQ0g7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE9BQU8sQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUMvQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxFQUFFLFVBQVUsS0FBSyxFQUFFLENBQUM7WUFDeEUsT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdILElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsaURBQWlEO1lBQ3pILEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxFQUFZLEVBQUUsR0FBVyxFQUFFLE1BQWM7UUFDM0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekMsWUFBWTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLFlBQVk7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUkscUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRDtRQUNELFlBQVk7UUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxXQUFXLENBQUMifQ==