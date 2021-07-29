import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ChannelService } from './services/channelService/channel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'xtzmsg';

  // animation
  isLoading: boolean = true;
  timeLeft: number = 1;
  interval: any;

  //channel init
  @ViewChild('topBar', {read: ElementRef, static: true })
  private topBar: ElementRef;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.loadingTimer();
  }

  loadingTimer(): void {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.isLoading = false;
      }
    },1000);
  }
}
