import { Component, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
  }

  private testCounter: number = 0;

  public addChannel(): void {
    this.channelService.addChannel(new ChannelInfo('TEESTLOCATION' + this.testCounter));
    this.testCounter++;
  }
}
