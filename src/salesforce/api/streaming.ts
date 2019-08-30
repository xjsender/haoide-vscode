/**
 * @file Streaming api
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import RestApi from "./rest";
import { _session } from "../../settings";

// StreamingChannel GET Response
export interface ChannelGetResponse {
    OnlineUserIds: string[];
    ChannelName: string;
}

// StreamingChannel Post Body
export interface PushEvent {
    payload: string;
    userIds: string[];
}

export interface ChannelPostResponse {
    fanoutCount: number;
    userOnlineStatus: any;
}

export class Topic {
    constructor() {

    }

    public subscribe() {

    }

    public unsubscribe() {

    }
}

export class StreamingChannel {
    constructor() {
        
    }

    public subscribe() {
        
    }

    public unsubscribe() {

    }

    public push(pushEvents: PushEvent[]) {

    }
}