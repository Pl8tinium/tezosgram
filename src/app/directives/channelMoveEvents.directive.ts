import { Directive, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ChannelComponent } from '../components/channel/channel.component';
import { ChannelService } from '../services/channelService/channel.service';

@Directive({
  selector: '[channelMoveEvents]'
})
export class ChannelMoveEventsDirective {

  constructor(private channelService: ChannelService, private channelComponent: ChannelComponent) { }

  @HostListener('mousedown', ['$event'])
  down() {
    this.channelService.currentlyMoving = this.channelComponent.info;
  }
}
