import { Injectable, OnInit } from '@angular/core';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { ChannelOrigination } from 'src/app/models/channelOrigination';
import { TemplateStorage } from 'src/assets/templateStorage';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { AccountInfo, BeaconEvent, Network, NetworkType, TezosOperationType } from '@airgap/beacon-sdk';
import { DialogService } from '../dialogService/dialog.service';
import { InMemorySigner } from '@taquito/signer';
import { XtzMsgOnChainContract } from 'src/assets/smartpyContracts/xtzmsgContractv1.0';
import { OriginationState } from 'src/app/models/enums/originationState';

@Injectable({
  providedIn: 'root'
})
export class ChainInteractionService {

  public readonly predefinedRpcs: Array<string> = Object.values(TemplateStorage.predefinedRpcs);

  private selectedRpc: string = this.predefinedRpcs[0];
  private activeAccount: AccountInfo | undefined = undefined;
  private tezosToolkit = new TezosToolkit(this.selectedRpc);
  private wallet = new BeaconWallet({ name: "wallet" });

  constructor(private dialogService: DialogService) {
    this.tezosToolkit.setWalletProvider(this.wallet);
    this.wallet.client.subscribeToEvent(BeaconEvent.ACTIVE_ACCOUNT_SET, (accountInfo: AccountInfo | undefined) => { this.activeAccount = accountInfo; });
    // this.tezosToolkit.setSignerProvider(InMemorySigner.fromFundraiser('qbefvyjp.rtiugebu@tezos.example.org', 'YrfdFa2Uw2', ["melt", "toast", "divide", "during", "train", "midnight", "become", "actor", "suit", "snake", "hire", "rather", "repeat", "pelican", "side"].join(' ')));
  }

  public get getRpc(): string {
    return this.selectedRpc;
  }

  public get isAuthenticated(): boolean {
    return this.activeAccount !== undefined;
  }

  public sendMessage(message: string, info: ChannelInfo): Promise<void> {
    return this.tezosToolkit.wallet
      .at(info.channelAddress)
      .then((c) => {
        return c.methods.default(message).send();
      })
      .then((op) => {
        console.info('Injected your message with the following operation hash: ' + op.opHash);
      })
      .catch((error) => {
        console.log(`Error while trying to inject operation: ${error}`);
        console.log(JSON.stringify(error));
        throw error;
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
    this.tezosToolkit.wallet.originate({
      code: XtzMsgOnChainContract.currentVersion,
      init: { "prim": "Pair", "args": [{ "string": channelOrigination.channelName }, { "string": "" }] },

    })
      .send()
      .then((originationOp) => {
        console.info(`Waiting for confirmation of origination with the following operation hash: ${originationOp.opHash}...`);
        channelOrigination.state = OriginationState.Injected;
        return originationOp.contract();
      })
      .then((contract) => {
        console.info('Successfully originated contract with the following address: ' + contract.address);
        channelOrigination.channelAddress = contract.address;
        channelOrigination.state = OriginationState.Originated;
      })
      .catch((error) => {
        console.info(error);
        this.dialogService.notify('Error while originating new contract, try again or check the console');
      });
  }
}
