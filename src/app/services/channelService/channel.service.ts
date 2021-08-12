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
    if (this.currentlyMoving !== undefined && this._channels.some(channel => channel.channelKey === info.channelKey)) {
      this._channels.find(channel => channel.channelKey === info.channelKey)?.instance.moveChannel(event);
    }
  }

  public addChannel(info: ChannelInfo): boolean {
    if (!this._channels.some(channel => channel.channelKey === info.channelKey)) {
      const highestLayer = Math.max(...this._channels.map(channel => channel.layer));
      info.layer = highestLayer !== -Infinity ? highestLayer + 1 : 1;
      this._channels.push(info);

      return true;
    }

    return false;
  }

  public removeChannel(info: ChannelInfo): void {
    if (this._channels.some(channel => channel.channelKey === info.channelKey)) {
      this._channels = this.channels.filter(channel => channel.channelKey !== info.channelKey);
    }
  }

  public layerUp(info: ChannelInfo): void {
    if (this._channels.length >= 2 && info.layer !== this._channels.length) {
      const subsequentChannel = this._channels.find(channel => channel.layer === info.layer + 1);
      if (subsequentChannel !== undefined) {
        subsequentChannel.layer--;
      }
      info.layer++;
    }
  }

  public layerDown(info: ChannelInfo): void {
    if (this._channels.length >= 2 && info.layer !== 1) {
      const previousChannel = this._channels.find(channel => channel.layer === info.layer - 1);
      if (previousChannel !== undefined) {
        previousChannel.layer++;
      }
      info.layer--;
    }
  }
}
