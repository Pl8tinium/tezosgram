import { Injectable, OnInit } from '@angular/core';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { TrustedAddresses } from 'src/assets/trustedAddresses';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChannelInfo } from 'src/app/models/channelInfo';

@Injectable({
  providedIn: 'root'
})
export class ChainInteractionService implements OnInit {

  public readonly predefinedRpcs: Array<string> = Object.values(TrustedAddresses.predefinedRpcs);

  private selectedRpc: string = this.predefinedRpcs[0];
  private tezosToolkit = new TezosToolkit(this.selectedRpc);
  private wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  constructor() { }

  public get getRpc(): string {
    return this.selectedRpc;
  }

  public get isAuthenticated(): boolean {
    return this.wallet.client.getActiveAccount() !== undefined;
  }

  public sendMessage(message: string, info: ChannelInfo): void {
    console.log(message)
  }

  public set setRpc(rpcUrl: string) {
    this.selectedRpc = rpcUrl;
    if (this.isValidUrl(this.selectedRpc)) {
      this.tezosToolkit.setRpcProvider(this.selectedRpc);
    }
  }

  public authWallet() {
    this.wallet.client.requestPermissions();
  }

  public deauthWallet() {
    this.wallet.clearActiveAccount();
  }

  public isValidUrl(url: string): boolean {
    try {
      let urlTemp = new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  public originateChannel(channelOrigination: ChannelOrigination): void {
    console.log(channelOrigination)
    channelOrigination.isOriginated = true;
  }

  ngOnInit(): void {
    this.tezosToolkit.setWalletProvider(this.wallet);
  }
}
