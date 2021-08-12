import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChannelInfo } from 'src/app/models/channelInfo';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  public currentlyMoving: ChannelInfo | undefined;
  private _channels: Array<ChannelInfo> = [];

  constructor() { }

  public get channels(): Array<ChannelInfo> {
    return this._channels;
  }

  public moveChannel(info: ChannelInfo, event: MouseEvent): void {
    if (this.currentlyMoving !== undefined && this._channels.some(channel => channel.channelLocation === info.channelLocation)) {
      this._channels.find(channel => channel.channelLocation === info.channelLocation)?.instance.moveChannel(event);
    }
  }

  public addChannel(info: ChannelInfo): void {
    if (!this._channels.some(channel => channel.channelLocation === info.channelLocation)) {
      this._channels.push(info);
    }
  }

  public removeChannel(info: ChannelInfo): void {
    if (this._channels.some(channel => channel.channelLocation === info.channelLocation)) {
      this._channels = this.channels.filter(channel => channel.channelLocation !== info.channelLocation);
    }
  }
}
