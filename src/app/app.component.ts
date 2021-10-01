import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xtzmsg';

  // animation
  isLoading: boolean = true;
  timeLeft: number = 1;
  interval: any;

  ngOnInit(): void {
    this.loadingTimer();
  }

  loadingTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.isLoading = false;
      }
    }, 590);
  }
}
