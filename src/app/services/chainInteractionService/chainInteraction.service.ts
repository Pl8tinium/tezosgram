import { Injectable, OnInit } from '@angular/core';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ChannelOrigination } from 'src/app/models/channelOrigination';

@Injectable({
  providedIn: 'root'
})
export class ChainInteractionService implements OnInit {

  public readonly predefinedRpcs: Array<string> = [
    "https://mainnet-tezos.giganode.io",
    "https://rpc.tzstats.com"
  ]

  private selectedRpc: string = this.predefinedRpcs[0];
  // private tezosToolkit = new TezosToolkit(this.selectedRpc);
  // private wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  constructor() {

  }

  public get getRpc(): string {
    return this.selectedRpc;
  }

  public get isAuthenticated(): boolean {
    // impl
    return true;
  }

  public set setRpc(rpcUrl: string) {
    this.selectedRpc = rpcUrl;
    if (this.isValidUrl(this.selectedRpc)) {
      console.log(this.selectedRpc)
      // this.tezosToolkit.setRpcProvider(this.selectedRpc);
    }
  }

  public authWallet() {

  }

  public deauthWallet() {

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
    // this.tezosToolkit.setWalletProvider(this.wallet);
  }
}
