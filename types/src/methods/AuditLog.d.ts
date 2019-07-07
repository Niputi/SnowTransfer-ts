import RequestHandler from "../RequestHandler";
import { TAuditLogObject } from "../LibTypes";
declare type TAction_type = 1 | 10 | 11 | 12 | 13 | 14 | 15 | 20 | 21 | 22 | 23 | 24 | 25 | 30 | 31 | 32 | 40 | 41 | 42 | 50 | 51 | 52 | 60 | 61 | 62 | 72;
interface Tdata {
    user_id: string;
    action_type: TAction_type;
    before: string;
    /***
     * @default 50
     */
    limit: number;
}
declare class AuditLogMethods {
    private requestHandler;
    /**
     * Create a new Audit Log Method Handler
     *
     * Usually SnowTransfer creates a method handler for you, this is here for completion
     *
     * You can access the methods listed via `client.auditLog.method`, where `client` is an initialized SnowTransfer instance
     * @param {RequestHandler} requestHandler - request handler that calls the rest api
     */
    constructor(requestHandler: RequestHandler);
    /**
     * Get the audit logs of the specified guild id
     * @param {String} guildId - id of a guild
     * @param {Object} [data] - optional audit log filter values
     * @param {String} [data.user_id] - Filter the audit log with the id of a user
     * @param {Number} [data.action_type] - [Type](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) of the audit log event
     * @param {String} [data.before] - Filter the audit log before a certain entry id
     * @param {Number} [data.limit=50] - How many entries are returned (min 1, max 100)
     * @returns {Promise<AuditLogObject>} - An object with audit log data
     *
     * | Permissions needed |
     |--------------------|
     | VIEW_AUDIT_LOG   |
     */
    getAuditLog(guildId: string, data?: Tdata): Promise<TAuditLogObject>;
}
/**
 * @typedef {Object} AuditLogObject
 * @description Audit Log Object
 * @property {Webhook[]} webhooks - list of [webhooks](https://discordapp.com/developers/docs/resources/webhook#webhook-object-webhook-structure) found in the audit log
 * @property {User[]} users - list of [users](https://discordapp.com/developers/docs/resources/user#user-object) found in the audit log
 * @property {AuditLogEntry[]} audit_log_entries - list of [audit log entries](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-entry-structure)
 */
/**
 * @typedef {Object} AuditLogEntry
 * @description A single audit log entry object
 * @property {String} target_id - id of the affected entity (webhook, user, role, etc...)
 * @property {AuditLogChange[]} changes - array of changes made to the target_id
 * @property {String} user_id - id of the user who made the changes
 * @property {String} id - id of the entry
 * @property {Number} action_type - [type](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events) of the action
 * @property {Object} options - [additional info](https://discordapp.com/developers/docs/resources/audit-log#audit-log-entry-object-optional-audit-entry-info) for some action types
 * @property {String} reason - reason for the change
 */
/**
 * @typedef {Object} AuditLogChange
 * @description A single audit log change object
 * @property {String|Number|Boolean|Role[]|PermissionOverwrite[]} new_value - new value of the key
 * @property {String|Number|Boolean|Role[]|PermissionOverwrite[]} old_value - old value of the key
 * @property {String} key - type of [audit log change key](https://discordapp.com/developers/docs/resources/audit-log#audit-log-change-object-audit-log-change-key)
 * @type {AuditLogMethods}
 */
export default AuditLogMethods;
//# sourceMappingURL=AuditLog.d.ts.map