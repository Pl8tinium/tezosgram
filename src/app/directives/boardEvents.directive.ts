import { Directive, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { BoardComponent } from '../components/board/board.component';
import { ChannelInfo } from '../models/channelInfo';
import { ChannelService } from '../services/channelService/channel.service';

@Directive({
  selector: 'app-board'
})
export class BoardEventsDirective {

  constructor(private channelService: ChannelService, private host: BoardComponent) { }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  up() {
    this.channelService.currentlyMoving = undefined;
  }

  @HostListener('mousemove', ['$event'])
  move() {
    this.channelService.moveChannel(this.channelService.currentlyMoving as ChannelInfo, event as MouseEvent);
  }

  // prevent drag and drop symbol which appears after clicking on the move button too much
  @HostListener('drag', ['$event'])
  @HostListener('dragenter', ['$event'])
  @HostListener('dragstart', ['$event'])
  test() {
    event?.preventDefault();
  }

  @HostListener('window:resize', ['$event'])
  getBoardDimensions() {
    this.host.getBoardDimensions();
  }
}
