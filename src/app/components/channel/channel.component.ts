import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { Dimension } from 'src/app/models/dimension';
import { BoardService } from 'src/app/services/boardService/board.service';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  private isInit: boolean = false;

  private mouseShift: Dimension = new Dimension(0, 0);

  private currentPos: Dimension = new Dimension(0, 0);

  private invisibleBoarder: Dimension = new Dimension(50, 50);

  private channelSize: Dimension = new Dimension(0, 0);

  @Input()
  public info: ChannelInfo;

  constructor(private channelService: ChannelService, private boardService: BoardService, private elementRef: ElementRef) {}

  public get position(): { top: string, left: string } {
    return {
      'top': this.currentPos.y + 'px',
      'left': this.currentPos.x + 'px', 
    };
  }

  ngOnInit(): void {
    this.moveChannelSub();
    this.setStartPosition();
    this.getChannelSize();
  }

  private getChannelSize(): void {
    this.channelSize.x = this.elementRef.nativeElement.children[0].offsetWidth;
    this.channelSize.y = this.elementRef.nativeElement.children[0].offsetHeight; 
  }

  private setStartPosition(): void {
    this.currentPos.x = Math.round(this.boardService.boardSize.x / 2); 
    this.currentPos.y =  Math.round(this.boardService.boardSize.y / 2 + this.channelService.topBarHeight);
  }

  // only allow the move to happen in a specific frame (the board)
  private isMoveValueInRange(range: Dimension): boolean {
    const lowestAllowedX = this.channelSize.x;
    const highestAllowedX = this.boardService.boardSize.x - this.invisibleBoarder.x;
    const lowestAllowedY = this.invisibleBoarder.y + this.channelService.topBarHeight;
    const highestAllowedY = this.boardService.boardSize.y + this.channelService.topBarHeight - this.channelSize.y;    
    const isXValid = range.x > lowestAllowedX && range.x < highestAllowedX;
    const isYValid = range.y > lowestAllowedY && range.y < highestAllowedY;

    return isXValid && isYValid;
  }

  private moveChannelSub(): void {    
    this.channelService.$moveChannel.subscribe((event: MouseEvent) => {
      if (this.info.channelLocation === this.channelService.currentlyMovedChannel?.channelLocation) {
        if (this.isMoveValueInRange(new Dimension(event.x, event.y))) {
          if (!this.isInit) {
            this.mouseShift = new Dimension(event.clientX - this.currentPos.x, event.clientY - this.currentPos.y);
            this.isInit = true;
          }
          this.currentPos.x = event.pageX - this.mouseShift.x + 2;
          this.currentPos.y = event.pageY - this.mouseShift.y;
        }
      }
    });
  }
}
