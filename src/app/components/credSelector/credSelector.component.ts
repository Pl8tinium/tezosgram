import { Component, OnInit } from '@angular/core';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { ChainInteractionService } from 'src/app/services/chainInteractionService/chainInteraction.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';

@Component({
  selector: 'app-cred-selector',
  templateUrl: './credSelector.component.html',
  styleUrls: ['./credSelector.component.scss']
})
export class CredSelectorComponent implements OnInit {

  public selectedRpc: string;

  constructor(public chainInteractionService: ChainInteractionService, private TEST: DialogService) { }

  ngOnInit(): void {
  }

  clickme() {
    this.TEST.notify("ye")
  }
}
