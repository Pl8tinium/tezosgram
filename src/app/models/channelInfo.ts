import { ChannelComponent } from "../components/channel/channel.component";

export class ChannelInfo {

    constructor(location: string) {
        this.channelLocation = location;
    }

    channelLocation: string;
    instance: ChannelComponent;
}
