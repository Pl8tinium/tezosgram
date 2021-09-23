import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { ChannelService } from 'src/app/services/channelService/channel.service';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { ChainInteractionService } from 'src/app/services/chainInteractionService/chainInteraction.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { PersistenceService } from 'src/app/services/persistenceService/persistence.service';
import { TemplateStorage } from 'src/assets/templateStorage';
import { OriginationState } from 'src/app/models/enums/originationState';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channelSelector.component.html',
  styleUrls: ['./channelSelector.component.scss']
})
export class ChannelSelectorComponent {

  public selectedChannel: string;
  private standardColor: string = '#2889e9';
  public selectedColor: string = this.standardColor;
  public OriginationState: any = OriginationState;
  public removeFromStorageDialog: MatDialogRef<DialogComponent, any>;
  public lastAddressRequestedToAdd: string;

  constructor(private channelService: ChannelService, private chainInfoService: ChainInfoService, private dialogService: DialogService, public chainInteractionService: ChainInteractionService, public persistenceService: PersistenceService) { }

  @ViewChild('originateChannelTemplate') private originateChannelTemplate: TemplateRef<any>;
  @ViewChild('addToStorageTemplate') private addToStorageTemplate: TemplateRef<any>;

  private channelOrigination: ChannelOrigination | undefined;

  public get availableChannels(): Array<string> {
    const addresses = TemplateStorage.trustedContracts.concat(this.persistenceService.getStoredAddresses)
    return addresses.filter((v, i, a) => a.indexOf(v) === i).filter(address => address !== '' && address !== undefined);
  }


  public get getChannelOrigination(): ChannelOrigination {
    return this.channelOrigination as ChannelOrigination;
  }

  public originateChannel(): void {
    this.channelOrigination = new ChannelOrigination();
    this.dialogService.displayForm(this.originateChannelTemplate);
  }

  public checkAddressAndAdd(): void {
    this.executeWhenContractValid(() => this.addAddressToStorage(this.selectedChannel));
  }

  public get getOriginationStatusColor(): string {
    let color = '';
    if (this.getChannelOrigination.state === OriginationState.NotDeployed) {
      color = 'grey';
    } else if (this.getChannelOrigination.state === OriginationState.Injected) {
      color = 'yellow';
    } else if (this.getChannelOrigination.state === OriginationState.Originated) {
      color = 'green';
    }
    return color;
  }

  public get getOriginationStatusToolTip(): string {
    let tip = '';
    if (this.getChannelOrigination.state === OriginationState.NotDeployed) {
      tip = 'Contract not deployed, yet';
    } else if (this.getChannelOrigination.state === OriginationState.Injected) {
      tip = 'Contract injected, please stay patient!';
    } else if (this.getChannelOrigination.state === OriginationState.Originated) {
      tip = 'Contract successfully originated!';
    }
    return tip;
  }

  private executeWhenContractValid(func: (Function)): void {
    this.chainInfoService.checkIfContractValid(this.selectedChannel).then((isValid: boolean) => {
      if (isValid) {
        func();
      } else {
        this.dialogService.notify("Contract has not been found on chain!");
      }
    });
  }

  public addAddressToStorage(address: string): void {
    const result = this.persistenceService.addAddressToStorage(address);
    if (!result) {
      this.lastAddressRequestedToAdd = address;
      this.removeFromStorageDialog = this.dialogService.displayForm(this.addToStorageTemplate);
    }
  }

  public removeAddressFromStorage(): void {
    this.persistenceService.removeAddressFromStorage(this.lastAddressRequestedToAdd);
    this.removeFromStorageDialog.close();
  }

  public addChannel(): void {
    const add = () => {
      const isAdded = this.channelService.addChannel(new ChannelInfo(this.selectedChannel, this.selectedColor));
      if (isAdded) {
        this.selectedColor = this.standardColor;
      }
    }

    if (this.availableChannels.includes(this.selectedChannel)) {
      add();
    } else {
      this.executeWhenContractValid(add);
    }
  }
}
