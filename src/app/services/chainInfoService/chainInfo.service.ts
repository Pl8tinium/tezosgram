import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { request } from 'http';
import { catchError, first, firstValueFrom, map, Observable, Subject, tap } from 'rxjs';
import { MsgOperation } from 'src/app/models/msgOperation';
import { DialogService } from '../dialogService/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ChainInfoService {

  private allowedContractsHashes: object = {
    "v0.1": "3c3956f3",
  };
  private newBlock: Subject<void>;
  private lastBlockHeight: number;
  private blockTime: number = 15000;

  private tzStatsApiUrl: string = "https://api.florence.tzstats.com";
  // private tzStatsApiUrl: string = "https://api.tzstats.com";

  constructor(private httpClient: HttpClient, private dialogService: DialogService) { }


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

  public getOperationMsgs(address: string): Observable<any> {
    const $response: Subject<any> = new Subject<any>();
    const apiOpTableEndpoint: string = "/tables/op?";
    const paramReceiver: string = "receiver.eq=" + address;
    const paramLimit: string = "limit=50000";
    const entrypointMessage: string = "addMsg";
    const indexMessage: number = 22;
    // implement pagination here, not necessary rn because a single query can hold 50k entries
    // still necessary to implement in the future because better performance can be archieved when
    // the chat is only partialy loaded regularly
    //const paramCursor: string = "cursor=LASTROWID"
    const paramColumns = "columns=height,sender,data,parameters";
    const requestUrl = this.tzStatsApiUrl + apiOpTableEndpoint + paramReceiver + "&" + paramLimit + "&" + paramColumns;
    this.httpClient.get<Array<Array<any>>>(requestUrl).subscribe({
      next: (response => {
        const msgOperations: Array<MsgOperation> = [];
        response.forEach((resp: Array<any>) => {
          const operation = new MsgOperation(...resp as [number, string, string, string]);
          if (operation.invokedEntrypoint === entrypointMessage) {
            operation.message = Buffer.from(operation.message.substr(indexMessage), 'hex').toString('utf-8');
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
    interface contractInfo {
      code_hash: string;
    }
    const apiContractEndpoint = "/explorer/contract/";
    const requestUrl = this.tzStatsApiUrl + apiContractEndpoint + address

    return firstValueFrom(this.httpClient.get<contractInfo>(requestUrl).pipe(
      map((contract: contractInfo) => {
        return Object.values(this.allowedContractsHashes).includes(contract.code_hash);
      }),
      catchError(err => {
        console.warn(err);
        return Promise.resolve(false);
      })
    ));
  }
}
