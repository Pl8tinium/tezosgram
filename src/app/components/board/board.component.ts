import { Component, ElementRef, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { Dimension } from 'src/app/models/dimension';
import { BoardService } from 'src/app/services/boardService/board.service';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public channels: Array<ChannelInfo> = [];

  constructor(private channelService: ChannelService, private elementRef: ElementRef, private boardService: BoardService) { }  

  ngOnInit(): void {
    this.getBoardDimensions();
    this.channelService.$addChannel.subscribe(x => this.addChannel(x));
    this.channelService.$removeChannel.subscribe(x => this.removeChannel(x));
  }

  private addChannel(info: ChannelInfo): void {
    this.channels.push(info);
  }

  private removeChannel(info: ChannelInfo): void {
    this.channels = this.channels.filter(c => c.channelLocation !== info.channelLocation);
  }

  public getBoardDimensions(): void {
    const y = this.elementRef.nativeElement.children[0].offsetHeight;
    const x = this.elementRef.nativeElement.children[0].offsetWidth;
    this.boardService.boardSize = new Dimension(x, y);
  }
}
