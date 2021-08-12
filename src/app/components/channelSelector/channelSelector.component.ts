import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channelSelector.component.html',
  styleUrls: ['./channelSelector.component.scss']
})
export class ChannelSelectorComponent implements OnInit {

  public selectedChannel: string;
  public availableChannels: string[] = ['One', 'Two', 'Three'];
  private standardColor: string = '#2889e9';
  public selectedColor: string = this.standardColor;

  constructor(private channelService: ChannelService) { }



  ngOnInit(): void {
  }

  public addChannel(): void {
    if (this.availableChannels.includes(this.selectedChannel)) {
      const isAdded = this.channelService.addChannel(new ChannelInfo(this.selectedChannel, this.selectedColor));
      if (isAdded) {
        this.selectedColor = this.standardColor;
      }
    }
  }
}
