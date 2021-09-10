import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { ChainInteractionService } from 'src/app/services/chainInteractionService/chainInteraction.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { TemplateStorage } from 'src/assets/templateStorage';

@Component({
  selector: 'app-cred-selector',
  templateUrl: './credSelector.component.html',
  styleUrls: ['./credSelector.component.scss']
})
export class CredSelectorComponent implements OnInit, AfterContentInit, AfterViewInit {

  public selectedRpc: string;
  public rpcSelection: FormControl = new FormControl();
  public isInitialized: boolean = false;
  public rpcSelectionClicked: boolean = false;

  constructor(public chainInteractionService: ChainInteractionService, private TEST: DialogService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.isInitialized = true;
  }

  ngAfterViewInit() {
    this.rpcSelection.setValue(Object.keys(TemplateStorage.predefinedRpcs)[0]);
  }

  clickme() {

  }
}
