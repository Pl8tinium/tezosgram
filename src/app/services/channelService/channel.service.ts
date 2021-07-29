import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChannelInfo } from 'src/app/models/channelModels';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  public topBarHeight: number;

  public currentlyMovedChannel: ChannelInfo | undefined;

  private $channelAdd: Subject<ChannelInfo>;

  private $channelRemove: Subject<ChannelInfo>;

  private $channelMove: Subject<MouseEvent>;

  constructor() { 
    this.$channelAdd = new Subject<ChannelInfo>();
    this.$channelRemove = new Subject<ChannelInfo>();
    this.$channelMove = new Subject<MouseEvent>();
  }

  public get $addChannel(): Observable<ChannelInfo> {
    return this.$channelAdd;
  }

  public get $removeChannel(): Observable<ChannelInfo> {
    return this.$channelRemove;
  }

  public get $moveChannel(): Observable<MouseEvent> {
    return this.$channelMove;
  }

  public moveChannel(event: MouseEvent): void {
    if (this.currentlyMovedChannel !== undefined) {
      this.$channelMove.next(event);
    }
  }

  public addChannel(info: ChannelInfo): void {
    this.$channelAdd.next(info);
  }

  public removeChannel(info: ChannelInfo): void {
    this.$channelRemove.next(info);
  }
}
