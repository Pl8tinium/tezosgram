import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TezosToolkit } from '@taquito/taquito';
import { Tzip16Module } from '@taquito/tzip16';
import { TaquitoTezosDomainsClient } from '@tezos-domains/taquito-client';
import { request } from 'http';
import { catchError, first, firstValueFrom, map, Observable, Subject, tap } from 'rxjs';
import { ChannelInfo } from 'src/app/models/channelInfo';
import { MsgOperation } from 'src/app/models/msgOperation';
import { TemplateStorage } from 'src/assets/templateStorage';
import { ChainInteractionService } from '../chainInteractionService/chainInteraction.service';
import { DialogService } from '../dialogService/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ChainInfoService {

  private newBlock: Subject<void>;
  private lastBlockHeight: number;
  private blockTime: number = 15000;
  private tezosToolkit = new TezosToolkit(this.chainInteractionService.getRpc);
  private alreadyResolvedDomains: { [key: string]: string } = {};

  //private tzStatsApiUrl: string = "https://api.florence.tzstats.com";
  //private tezosDomains = new TaquitoTezosDomainsClient({ tezos: this.tezosToolkit, network: 'florencenet', caching: { enabled: true } });
  private tzStatsApiUrl: string = "https://api.tzstats.com";
  private tezosDomains = new TaquitoTezosDomainsClient({ tezos: this.tezosToolkit, network: 'mainnet', caching: { enabled: true } });

  constructor(private httpClient: HttpClient, private dialogService: DialogService, private chainInteractionService: ChainInteractionService) {
    this.tezosToolkit.addExtension(new Tzip16Module());
  }

  public get newBlockNotification(): Observable<void> {
    if (this.newBlock === undefined) {
      this.newBlock = new Subject<void>();
      this.checkForNewBlock();
    }

    return this.newBlock;
  }

  private checkForNewBlock(): void {
    interface blockInfo {
      height: number;
    }
    const apiBlockEndpoint = "/explorer/block/";
    const requestUrl = this.tzStatsApiUrl + apiBlockEndpoint + "head";
    const refreshFactor = 0.66;

    const loop = setInterval(() => {
      this.httpClient.get<blockInfo>(requestUrl).subscribe({
        next: ((newBlockInfo: blockInfo) => {
          if (newBlockInfo.height !== this.lastBlockHeight) {
            this.lastBlockHeight = newBlockInfo.height;
            this.newBlock.next();
          }
        }), error: ((error) => {
          console.warn(error);
          this.dialogService.notify("Couldn't fetch latest block info. Your chats may be outdated!");
        })
      })
      if (!this.newBlock.observed) {
        clearInterval(loop);
      }
    }, this.blockTime * refreshFactor);
  }

  public fetchAdditionalChannelInfo(info: ChannelInfo): void {
    this.getChannelName(info);
    this.getChannelVersion(info);
  }

  private resolveAddressToName(msgOperation: MsgOperation): void {
    if (this.alreadyResolvedDomains[msgOperation.senderAddress] !== undefined) {
      msgOperation.senderAddressResolved = this.alreadyResolvedDomains[msgOperation.senderAddress];
    } else {
      this.tezosDomains.resolver.resolveAddressToName(msgOperation.senderAddress).then((name: string | null) => {
        msgOperation.senderAddressResolved = name;
        this.alreadyResolvedDomains[msgOperation.senderAddress] = <string>name;
      });
    }
  }

  private getChannelName(info: ChannelInfo): void {
    const apiContractEndpoint: string = "/explorer/contract/";
    const apiStorageEndpoint: string = "/storage";
    const requestUrl = this.tzStatsApiUrl + apiContractEndpoint + info.channelAddress + apiStorageEndpoint;
    this.httpClient.get(requestUrl).subscribe({
      next: ((response: any) => {
        info.channelName = response['value']['channelName'];
      }), error: (err => {
        info.channelName = "Channelname not fetchable";
        console.warn("Error while fetching channel name: ", err);
      })
    });
  }

  private getChannelVersion(info: ChannelInfo): void {
    const apiContractEndpoint: string = "/explorer/contract/";
    const requestUrl = this.tzStatsApiUrl + apiContractEndpoint + info.channelAddress;
    this.httpClient.get(requestUrl).subscribe({
      next: ((response: any) => {
        if (Object.keys(TemplateStorage.allowedContractsHashes).includes(response['code_hash'])) {
          info.channelVersion = TemplateStorage.allowedContractsHashes[response['code_hash']];
        } else {
          throw new Error("Code hash not found in response");
        }
      }), error: (err => {
        info.channelVersion = "not fetchable";
        console.warn("Error while fetching channel code version: ", err);
      })
    });
  }

  public getOperationMsgs(address: string): Observable<Array<MsgOperation>> {
    const $response: Subject<Array<MsgOperation>> = new Subject<Array<MsgOperation>>();
    const apiOpTableEndpoint: string = "/tables/op?";
    const paramReceiver: string = "receiver.eq=" + address;
    const paramLimit: string = "limit=50000";
    const entrypointMessage: string = "addMsg";
    const indexMessage: number = 22;
    // implement pagination here, not necessary rn because a single query can hold 50k entries
    // still necessary to implement in the future because better performance can be archieved when
    // the chat is only partialy loaded regularly + a lot less api calls for tz domains/ tzstats
    // const paramCursor: string = "cursor=LASTROWID"
    const paramColumns = "columns=height,sender,data,parameters";
    const requestUrl = this.tzStatsApiUrl + apiOpTableEndpoint + paramReceiver + "&" + paramLimit + "&" + paramColumns;
    this.httpClient.get<Array<Array<any>>>(requestUrl).subscribe({
      next: (response => {
        const msgOperations: Array<MsgOperation> = [];
        response.forEach((resp: Array<any>) => {
          const operation = new MsgOperation(...resp as [number, string, string, string]);
          if (operation.invokedEntrypoint === entrypointMessage) {
            operation.message = Buffer.from(operation.message.substr(indexMessage), 'hex').toString('utf-8');
            this.resolveAddressToName(operation);
            msgOperations.push(operation);
          }
        })
        $response.next(msgOperations)
      }), error: (err => {
        this.dialogService.notify("Couldn't retrieve message data for contract " + address);
      })
    });
    return $response;
  }

  public checkIfContractValid(address: string): Promise<boolean> {
    interface ContractInfo {
      code_hash: string;
    }
    const apiContractEndpoint = "/explorer/contract/";
    const requestUrl = this.tzStatsApiUrl + apiContractEndpoint + address

    return firstValueFrom(this.httpClient.get<ContractInfo>(requestUrl).pipe(
      map((contract: ContractInfo) => {
        return Object.keys(TemplateStorage.allowedContractsHashes).includes(contract.code_hash);
      }),
      catchError(err => {
        console.warn(err);
        return Promise.resolve(false);
      })
    ));
  }
}
