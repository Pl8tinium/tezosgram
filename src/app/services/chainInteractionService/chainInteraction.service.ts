import { Injectable, OnInit } from '@angular/core';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { TrustedAddresses } from 'src/assets/trustedAddresses';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { AccountInfo, Network, NetworkType, TezosOperationType } from '@airgap/beacon-sdk';
import { DialogService } from '../dialogService/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ChainInteractionService implements OnInit {

  public readonly predefinedRpcs: Array<string> = Object.values(TrustedAddresses.predefinedRpcs);

  private selectedRpc: string = this.predefinedRpcs[0];
  private activeAccount: AccountInfo | undefined = undefined;
  private tezosToolkit = new TezosToolkit(this.selectedRpc);
  private wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  constructor(private dialogService: DialogService) { }

  public get getRpc(): string {
    return this.selectedRpc;
  }

  public get isAuthenticated(): boolean {
    return this.activeAccount !== undefined;
  }

  public sendMessage(message: string, info: ChannelInfo): void {
    // this.wallet.sendOperations([
    //   {
    //     kind: TezosOperationType.TRANSACTION,
    //     destination: info.channelAddress, // Send to ourselves
    //     amount: "0", // Amount in mutez, the smallest unit in Tezos

    //   },
    //   {
    //     kind: 'transaction',
    //     balance: '50',
    //     spendable: false,
    //     delegatable: false,
    //     script: {
    //       code: [{ "prim": "parameter", "args": [{ "prim": "contract", "args": [{ "prim": "unit" }], "annots": [":X"] }] }, { "prim": "storage", "args": [{ "prim": "unit" }] }, { "prim": "code", "args": [[{ "prim": "CDR", "annots": ["@storage_slash_1"] }, { "prim": "NIL", "args": [{ "prim": "operation" }] }, { "prim": "PAIR" }]] }],
    //       storage: { "prim": "Unit" }
    //     }
    //   }
    // ]).then(hash => this.dialogService.notify('Injected operation with following hash: ' + hash));
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
    // this.wallet.sendOperations([
    //   {
    //     kind: TezosOperationType.TRANSACTION,
    //     destination: info.channelAddress, // Send to ourselves
    //     amount: "0", // Amount in mutez, the smallest unit in Tezos

    //   },
    //   {
    //     kind: 'transaction',
    //     balance: '50',
    //     spendable: false,
    //     delegatable: false,
    //     script: {
    //       code: [{"prim":"parameter","args":[{"prim":"contract","args":[{"prim":"unit"}],"annots":[":X"]}]},{"prim":"storage","args":[{"prim":"unit"}]},{"prim":"code","args":[[{"prim":"CDR","annots":["@storage_slash_1"]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}],
    //       storage: {"prim":"Unit"}
    //     }
    //   }
    // ]).then(hash => this.dialogService.notify('Injected operation with following hash: ' + hash)); 
  }

  ngOnInit(): void {
    this.tezosToolkit.setWalletProvider(this.wallet);
    this.wallet.client.getActiveAccount().then((accountInfo: AccountInfo | undefined) => this.activeAccount = accountInfo);
  }
}
