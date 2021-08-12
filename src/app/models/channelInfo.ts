import { ChannelComponent } from "../components/channel/channel.component";

export class ChannelInfo {

    constructor(location: string, channelColor?: string) {
        this.channelKey = location;
        if (channelColor) {
            this.channelColor = channelColor;
        }
    }

    channelKey: string;
    channelColor: string;
    instance: ChannelComponent;
    layer: number;
}
