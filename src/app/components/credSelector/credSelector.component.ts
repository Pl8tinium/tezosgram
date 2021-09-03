import { Component, OnInit } from '@angular/core';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { CredService } from 'src/app/services/credService/cred.service';
import { NotifyService } from 'src/app/services/notifyService/notify.service';

@Component({
  selector: 'app-cred-selector',
  templateUrl: './credSelector.component.html',
  styleUrls: ['./credSelector.component.scss']
})
export class CredSelectorComponent implements OnInit {

  public selectedRpc: string;

  constructor(public credService: CredService, private TEST: NotifyService) { }

  ngOnInit(): void {
  }

  clickme() {
    this.TEST.notify("ye")
  }
}
