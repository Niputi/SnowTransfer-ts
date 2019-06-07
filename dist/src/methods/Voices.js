"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Endpoints_1 = require("../Endpoints");
/**
 * Methods for interacting with voice stuff via rest
 */
class VoiceMethods {
    /**
     * Create a new Voice Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.voice.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler) {
        this.requestHandler = requestHandler;
    }
    /**
     * Get currently available voice regions that can be used when creating servers
     * @returns {Promise.<VoiceRegion[]>} Array of [voice region](https://discordapp.com/developers/docs/resources/voice#voice-region-object) objects
     */
    async getVoiceRegions() {
        return this.requestHandler.request(Endpoints_1.default.VOICE_REGIONS, 'get', 'json');
    }
}
/**
 * @typedef {Object} VoiceRegion
 * @property {String} id - id of the region
 * @property {String} name - name of the region
 * @property {String} sample_hostname - example hostname of the region
 * @property {Number} sample_port - example port of the region
 * @property {Boolean} vip - if this is a vip region
 * @property {Boolean} optimal - if this region is closest to the user
 * @property {Boolean} deprecated - if this region should not be used anymore
 * @property {Boolean} custom - if this is a custom region (used for events/etc)
 */
exports.default = VoiceMethods;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9pY2VzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL21ldGhvZHMvVm9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQXFDO0FBSXJDOztHQUVHO0FBQ0gsTUFBTSxZQUFZO0lBSWQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksY0FBOEI7UUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9FLENBQUM7Q0FDSjtBQUVEOzs7Ozs7Ozs7O0dBVUc7QUFFSCxrQkFBZSxZQUFZLENBQUMifQ==