import { Directive, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChannelInfo } from '../models/channelModels';
import { ChannelService } from '../services/channelService/channel.service';

@Directive({
  selector: 'app-board'
})
export class BoardEventsDirective {
  
  constructor(private channelService: ChannelService) { }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  up() {
    this.channelService.currentlyMovedChannel = undefined;    
  }

  @HostListener('mousemove', ['$event'])
  move() {
    this.channelService.moveChannel(event as MouseEvent);
  }
}
