'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Bucket used for saving ratelimits
 * @property {Array} fnQueue - array of functions waiting to be executed
 * @property {Number} limit - Number of functions that may be executed during the timeframe set in limitReset
 * @property {Number} remaining - Remaining amount of executions during the current timeframe
 * @property {Number} limitReset - Timeframe in milliseconds until the ratelimit resets
 * @property {Object} resetTimeout - Timeout that calls the reset function once the timeframe passed
 * @property {Ratelimiter} ratelimiter - ratelimiter used for ratelimiting requests
 * @protected
 */
class LocalBucket {
    /**
     * Create a new bucket
     * @param {Ratelimiter} ratelimiter - ratelimiter used for ratelimiting requests
     * @protected
     */
    constructor(ratelimiter) {
        this.fnQueue = [];
        this.limit = 5;
        this.remaining = 1;
        this.reset = 5000;
        this.resetTimeout = null;
        this.ratelimiter = ratelimiter;
    }
    /**
     * Queue a function to be executed
     * @param {Function} fn - function to be executed
     * @returns {Promise.<void>} - Result of the function if any
     * @protected
     */
    queue(fn) {
        return new Promise((res, rej) => {
            let bkt = this;
            let wrapFn = () => {
                //@ts-ignore
                if (typeof fn.then === 'function') {
                    return fn(bkt).then(res).catch(rej);
                }
                return res(fn(bkt));
            };
            this.fnQueue.push({
                fn, callback: wrapFn
            });
            this.checkQueue();
        });
    }
    /**
     * Check if there are any functions in the queue that haven't been executed yet
     * @protected
     */
    checkQueue() {
        if (this.ratelimiter.global) {
            //@ts-ignore
            this.resetTimeout = setTimeout(() => this.resetRemaining(), this.ratelimiter.globalReset);
            return;
        }
        if (this.remaining === 0) {
            //@ts-ignore
            this.resetTimeout = setTimeout(() => this.resetRemaining(), this.reset);
            return;
        }
        if (this.fnQueue.length > 0 && this.remaining !== 0) {
            let queuedFunc = this.fnQueue.splice(0, 1)[0];
            queuedFunc.callback();
        }
    }
    /**
     * Reset the remaining tokens to the base limit
     * @protected
     */
    resetRemaining() {
        this.remaining = this.limit;
        clearTimeout(this.resetTimeout);
        this.checkQueue();
    }
    /**
     * Clear the current queue of events to be sent
     * @protected
     */
    dropQueue() {
        this.fnQueue = [];
    }
}
exports.default = LocalBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxCdWNrZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvcmF0ZWxpbWl0QnVja2V0cy9Mb2NhbEJ1Y2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBS2I7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxXQUFXO0lBU2I7Ozs7T0FJRztJQUNILFlBQVksV0FBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsRUFBWTtRQUNkLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNkLFlBQVk7Z0JBQ1osSUFBSSxPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QztnQkFDRCxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDZCxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU07YUFDdkIsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILFVBQVU7UUFDTixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3pCLFlBQVk7WUFDWixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRixPQUFPO1NBQ1Y7UUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLFlBQVk7WUFDWixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hFLE9BQU87U0FDVjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxFQUFFO1lBQ2pELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYztRQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsU0FBUztRQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDSjtBQUVELGtCQUFlLFdBQVcsQ0FBQyJ9