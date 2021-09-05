import { ChannelComponent } from "../components/channel/channel.component";

export class ChannelInfo {

    constructor(location: string, channelColor?: string) {
        this.channelAddress = location;
        if (channelColor) {
            this.channelColor = channelColor;
        }
    }

    public channelAddress: string;
    public channelName: string;
    public channelColor: string;
    public instance: ChannelComponent;
    public layer: number;
}
