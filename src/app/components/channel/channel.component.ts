import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {
  private isInit: boolean = false;

  private mouseShift: { x: number, y: number } = {
    x: 0,
    y: 0,
  }  

  private coordX: number = 0;
  private coordY: number = 0;

  private allowMove: boolean = false;

  @Input()
  info: ChannelInfo;

  constructor(private channelService: ChannelService) {}

  public get position(): { top: string, left: string } {
    return {
      'top': this.coordY + 'px',
      'left': this.coordX + 'px', 
    };
  }

  ngOnInit(): void {
    this.channelService.$moveChannel.subscribe((event: MouseEvent) => {
      if (this.info.channelLocation === this.channelService.currentlyMovedChannel?.channelLocation) {
        if (!this.isInit) {
          this.mouseShift = { x: event.clientX, y: event.clientY }
          this.isInit = true;
        }
        this.coordX = event.pageX - this.mouseShift.x + 2;
        this.coordY = event.pageY - this.mouseShift.y;      
      }
    })
  }
}
