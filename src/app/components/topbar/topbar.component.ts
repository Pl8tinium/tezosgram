import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelModels';
import { ChannelService } from 'src/app/services/channelService/channel.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {

  constructor(private channelService: ChannelService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.channelService.topBarHeight = this.elementRef.nativeElement.children[0].offsetHeight;
  }

  private testCounter: number = 0;

  public addChannel(): void {
    this.channelService.addChannel(new ChannelInfo('TEESTLOCATION' + this.testCounter));
    this.testCounter++;
  }
}
