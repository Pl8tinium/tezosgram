import { OriginationState } from "./enums/originationState";

export class ChannelOrigination {

    public channelAddress: string;
    public channelName: string;
    public state: OriginationState = OriginationState.NotDeployed;
}
