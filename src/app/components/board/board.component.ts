import { Component, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public channels: Array<ChannelInfo> = [];

  constructor(private channelService: ChannelService) { }  

  ngOnInit(): void {
    this.channelService.$addChannel.subscribe(x => this.addChannel(x));
    this.channelService.$removeChannel.subscribe(x => this.removeChannel(x));
  }

  private addChannel(info: ChannelInfo): void {
    this.channels.push(info);
  }

  private removeChannel(info: ChannelInfo): void {
    this.channels = this.channels.filter(c => c.channelLocation !== info.channelLocation);
  }
}
