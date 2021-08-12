import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { ChannelService } from 'src/app/services/channelService/channel.service';
import { TopBarService } from 'src/app/services/topBarService/topBar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopBarComponent implements OnInit, AfterViewInit {

  constructor(private topBarService: TopBarService, private channelService: ChannelService, private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.topBarService.setTopBarHeight = this.elementRef.nativeElement.children[0].offsetHeight;
  }
}
