import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { Dimension } from 'src/app/models/dimension';
import { MsgOperation } from 'src/app/models/msgOperation';
import { BoardService } from 'src/app/services/boardService/board.service';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { ChainInteractionService } from 'src/app/services/chainInteractionService/chainInteraction.service';
import { ChannelService } from 'src/app/services/channelService/channel.service';
import { TopBarService } from 'src/app/services/topBarService/topBar.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {
  public messages: Array<MsgOperation>;
  private isInit: boolean = false;
  private mouseShift: Dimension = new Dimension(0, 0);
  private currentPos: Dimension = new Dimension(0, 0);
  private invisibleBorder: Dimension = new Dimension(50, 50);
  private channelSize: Dimension = new Dimension(0, 0);
  private newBlockSubscription: Subscription;
  public currentMessage: string = '';


  @Input()
  public info: ChannelInfo;

  constructor(private topBarService: TopBarService, public channelService: ChannelService, private boardService: BoardService, private elementRef: ElementRef, private chainInfoService: ChainInfoService, private chainInteractionService: ChainInteractionService) { }

  public get position(): { top: string, left: string, zIndex: string } {
    return {
      'top': this.currentPos.y + 'px',
      'left': this.currentPos.x + 'px',
      'zIndex': this.info.layer.toString(),
    };
  }

  ngOnInit(): void {
    this.info.instance = this;
    this.setStartPosition();
    this.getChannelSize();
    this.initHtml();
    this.info.channelName = this.chainInfoService.getChannelName();
    this.fetchMsgs();
    this.newBlockSubscription = this.chainInfoService.newBlockNotification.subscribe(() => this.fetchMsgs());
  }

  public sendMessage(): void {
    this.chainInteractionService.sendMessage(this.currentMessage, this.info);
  }

  private fetchMsgs(): void {
    this.chainInfoService.getOperationMsgs(this.info.channelAddress).subscribe((msgOps: Array<MsgOperation>) => this.messages = msgOps);
  }

  ngOnDestroy(): void {
    this.newBlockSubscription.unsubscribe();
  }

  private initHtml(): void {
    this.elementRef.nativeElement.children[0].children[1].style.backgroundColor = this.info.channelColor;
    this.elementRef.nativeElement.children[0].style.zIndex = this.info.layer;
  }

  private getChannelSize(): void {
    this.channelSize.x = this.elementRef.nativeElement.children[0].offsetWidth;
    this.channelSize.y = this.elementRef.nativeElement.children[0].offsetHeight;
  }

  private setStartPosition(): void {
    this.currentPos.x = Math.round(this.boardService.boardSize.x / 2);
    this.currentPos.y = Math.round(this.boardService.boardSize.y / 2 + this.topBarService.topBarHeight);
  }

  // only allow the move to happen in a specific frame (the board)
  private isMoveValueInRange(range: Dimension): boolean {
    const lowestAllowedX = this.channelSize.x;
    const highestAllowedX = this.boardService.boardSize.x - this.invisibleBorder.x;
    const lowestAllowedY = this.invisibleBorder.y + this.topBarService.topBarHeight;
    const highestAllowedY = this.boardService.boardSize.y + this.topBarService.topBarHeight - this.channelSize.y;
    const isXValid = range.x > lowestAllowedX && range.x < highestAllowedX;
    const isYValid = range.y > lowestAllowedY && range.y < highestAllowedY;

    return isXValid && isYValid;
  }

  // move channel
  public moveChannel(event: MouseEvent): void {
    if (this.isMoveValueInRange(new Dimension(event.x, event.y))) {
      if (!this.isInit) {
        this.mouseShift = new Dimension(event.clientX - this.currentPos.x, event.clientY - this.currentPos.y);
        this.isInit = true;
      }
      this.currentPos.x = event.pageX - this.mouseShift.x + 2;
      this.currentPos.y = event.pageY - this.mouseShift.y;
    }
  }

  public closeChannel(): void {
    this.channelService.removeChannel(this.info);
  }

  public layerUp(): void {
    this.channelService.layerUp(this.info);
  }

  public layerDown(): void {
    this.channelService.layerDown(this.info);
  }
}
