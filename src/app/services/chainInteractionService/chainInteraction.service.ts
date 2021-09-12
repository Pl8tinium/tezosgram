import { Injectable, OnInit } from '@angular/core';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { TemplateStorage } from 'src/assets/templateStorage';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { AccountInfo, Network, NetworkType, TezosOperationType } from '@airgap/beacon-sdk';
import { DialogService } from '../dialogService/dialog.service';
import { InMemorySigner } from '@taquito/signer';

@Injectable({
  providedIn: 'root'
})
export class ChainInteractionService implements OnInit {

  public readonly predefinedRpcs: Array<string> = Object.values(TemplateStorage.predefinedRpcs);

  private selectedRpc: string = "https://florencenet.api.tez.ie";// this.predefinedRpcs[0];
  private activeAccount: AccountInfo | undefined = undefined;
  private tezosToolkit = new TezosToolkit(this.selectedRpc);
  private wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  constructor(private dialogService: DialogService) {
    this.tezosToolkit.setSignerProvider(InMemorySigner.fromFundraiser('qbefvyjp.rtiugebu@tezos.example.org', 'YrfdFa2Uw2', ["melt", "toast", "divide", "during", "train", "midnight", "become", "actor", "suit", "snake", "hire", "rather", "repeat", "pelican", "side"].join(' ')));
  }

  public get getRpc(): string {
    return this.selectedRpc;
  }

  public get isAuthenticated(): boolean {
    return this.activeAccount !== undefined;
  }

  public sendMessage(message: string, info: ChannelInfo): Promise<void> {
    return this.tezosToolkit.contract
      .at(info.channelAddress)
      .then((c) => {
        return c.methods.default(message).send();
      })
      .then((op) => {
        console.info('Injected your message with the following operation hash: ' + op.hash);
      })
      .catch((error) => {
        console.log(`Error while trying to inject operation: ${error}`);
        console.log(JSON.stringify(error));
      });
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
      const urlTemp = new URL(url);
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
    // this.tezosToolkit.setWalletProvider(this.wallet);
    // this.tezosToolkit.setSignerProvider();
    //this.tezosToolkit.setProvider({ signer: InMemorySigner.fromFundraiser('qbefvyjp.rtiugebu@tezos.example.org', 'YrfdFa2Uw2', ["melt", "toast", "divide", "during", "train", "midnight", "become", "actor", "suit", "snake", "hire", "rather", "repeat", "pelican", "side"].join(' ')) })
    this.wallet.client.getActiveAccount().then((accountInfo: AccountInfo | undefined) => this.activeAccount = accountInfo);
  }
}
