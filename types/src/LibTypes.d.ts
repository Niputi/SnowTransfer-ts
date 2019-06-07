/// <reference types="node" />
export interface TGuild {
    id: string;
    name: string;
    iocn: string;
    splash: string;
    owner_id: string;
    region: string;
    afk_channel_id: string;
    afk_timeout: number;
    embed_enabled: boolean;
    embed_channel_id: string;
    verification: number;
    default_message_notifications: number;
    explicit_content_filter: number;
    roles: TRole[];
    emojis: TEmoji[];
    features: string[];
    mfa_level: number;
    application_id?: string;
    widget_enabled: boolean;
    widget_channel_id: string;
}
export interface TEmoji {
    id: string;
    name: string;
    roles?: TRole[];
    user?: TUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
}
export interface TChannel {
    Id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites: TPermissionOverwrite[];
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: string;
    bitrate?: number;
    user_limit?: number;
    recipients?: TUser[];
    icon?: string;
    application_id?: string;
    parent_id?: string;
}
export interface TGuildMember {
    user: TUser;
    nick?: string;
    roles: Array<string>;
    joined_at: string;
    premium_since: string;
    deaf: boolean;
    mute: boolean;
}
export interface TBan {
    reason?: string;
    user: TUser;
}
export interface TUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    bot?: boolean;
    mfa_enabled?: boolean;
    locale?: string;
    verified?: boolean;
    premium_type?: 1 | 2;
}
export declare type TRole = {
    Id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: number;
    managed: boolean;
    mentionable: boolean;
};
export interface TPermissionOverwrite {
    allow: number;
    deny: number;
    type: string;
}
export interface TAuditLogChange {
    new_value: string | number | boolean | TRole[] | TPermissionOverwrite[];
    old_value: string | number | boolean | TRole[] | TPermissionOverwrite[];
    key: string;
}
export interface TAuditLogEntry {
    target_id: string;
    changes: TAuditLogChange;
    user_id: string;
    id: string;
    action_type: number;
    options: {
        delete_member_days: string;
        members_removed: string;
        channel_id: string;
        count: string;
        id: string;
        type: string;
        role_name: string;
    };
    reason: string;
}
export interface TAuditLogObject {
    webhooks: TWebhook[];
    users: TUser[];
    audit_log_entries: TAuditLogEntry[];
}
export interface TGatewayData {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
    };
}
export interface TGuildEmbed {
    enabled: boolean;
    channel_id: string;
}
export interface TInvite {
    code: string;
    guild: TGuild;
    channel: TChannel;
    uses?: number;
    max_uses?: number;
    max_age?: number;
    temporary?: boolean;
    created_at?: Date;
    revoked?: boolean;
}
export interface TVoiceRegion {
    id: string;
    name: string;
    sample_hostname: string;
    sample_port: number;
    vip: boolean;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}
export interface TSelfUser {
    bot: boolean;
    mfa_enabled: boolean;
    verified: boolean;
    email: string;
}
export interface TWebhook {
    id: string;
    guild_id?: string;
    channel_id: string;
    user?: TUser;
    name: string | null;
    avatar: string | null;
    token: string;
}
export interface TMessage {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: TUser;
    member?: TGuildMember;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: any;
    mention_roles: string[];
    attachments: {
        id: string;
        filename: string;
        size: string;
        url: string;
        proxy_url: string;
        height: number | null;
        width: number | null;
    }[];
    embeds: TEmbedObject[];
    reactions?: {
        count: number;
        me: boolean;
        emoji: TEmoji;
    }[];
    pinned: boolean;
    webhook_id?: string;
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    activity?: {
        type: 1 | 2 | 3 | 5;
        party_id?: string;
    };
    application?: {
        id: string;
        cover_image?: string;
        description: string;
        icon: string | null;
        name: string;
    };
}
declare type TEmbedObject = {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: {
        text: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    image?: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    thumbnail?: {
        url?: string;
        proxy_url?: string;
        height?: number;
        width?: number;
    };
    video?: {
        url: string;
        height?: number;
        width?: number;
    };
    provider?: {
        name: string;
        url?: string;
    };
    author?: {
        name: string;
        url?: string;
        icon_url?: string;
        proxy_icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
};
export declare type PartialInputMessage = {
    content?: string;
    tts?: boolean;
    embed?: TEmbedObject;
    file?: {
        name?: string;
        file: Buffer;
    };
};
export {};
