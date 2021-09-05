import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { ChannelService } from 'src/app/services/channelService/channel.service';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';
import { ChainInteractionService } from 'src/app/services/chainInteractionService/chainInteraction.service';
import { DialogService } from 'src/app/services/dialogService/dialog.service';
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { PersistenceService } from 'src/app/services/persistenceService/persistence.service';
import { TrustedAddresses } from 'src/assets/trustedAddresses';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channelSelector.component.html',
  styleUrls: ['./channelSelector.component.scss']
})
export class ChannelSelectorComponent implements OnInit {

  public selectedChannel: string;
  private standardColor: string = '#2889e9';
  public selectedColor: string = this.standardColor;

  constructor(private channelService: ChannelService, private chainInfoService: ChainInfoService, private dialogService: DialogService, public chainInteractionService: ChainInteractionService, public persistenceService: PersistenceService) { }

  @ViewChild('originateChannelTemplate') private originateChannelTemplate: TemplateRef<any>;

  private channelOrigination: ChannelOrigination | undefined;

  ngOnInit(): void {

  }

  public get availableChannels(): Array<string> {
    const addresses = TrustedAddresses.trustedContracts.concat(this.persistenceService.getStoredAddresses)
    return addresses.filter((v, i, a) => a.indexOf(v) === i).filter(address => address !== '' && address !== undefined);
  }

  public get getChannelOrigination(): ChannelOrigination {
    return this.channelOrigination as ChannelOrigination;
  }

  public originateChannel(): void {
    this.channelOrigination = new ChannelOrigination();
    this.dialogService.displayForm(this.originateChannelTemplate);
  }

  public addAddressToStorage(): void {
    this.executeWhenContractValid(this.persistenceService.addAddressToStorage, [this.selectedChannel]);
  }

  private executeWhenContractValid(func: Function, params?: Array<any>): void {
    this.chainInfoService.checkIfContractValid(this.selectedChannel).then((isValid: boolean) => {
      if (isValid) {
        if (params) {
          func(...params);
        } else {
          func();
        }
      } else {
        this.dialogService.notify("Contract has not been found on chain!");
      }
    });
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
