import { Directive, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChannelInfo } from '../models/channelModels';
import { ChannelService } from '../services/channelService/channel.service';

@Directive({
  selector: '[channelMoveEvents]'
})
export class ChannelMoveEventsDirective {

  @Input()
  public channelInfo: ChannelInfo;

  constructor(private channelService: ChannelService) { }

  @HostListener('mousedown', ['$event'])
  down() {
    this.channelService.currentlyMovedChannel = this.channelInfo;
  }
}
