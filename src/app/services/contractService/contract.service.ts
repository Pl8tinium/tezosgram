import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { MsgOperation } from 'src/app/models/msgOperation';
import { NotifyService } from '../notifyService/notify.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private tzStatsApiUrl: string = "https://api.florence.tzstats.com";
  private entrypointMessage: string = "addMsg";
  // private tzStatsApiUrl: string = "https://api.tzstats.com";

  constructor(private httpClient: HttpClient, private notifyService: NotifyService) { }

  public getOperationMsgs(address: string): Observable<any> {
    const $response: Subject<any> = new Subject<any>();
    const apiOpTableEndpoint: string = "/tables/op?";
    const paramReceiver: string = "receiver.eq=" + address;
    const paramLimit: string = "limit=50000";
    // implement pagination here, not necessary rn because a single query can hold 50k entries
    //const paramCursor: string = "LASTROWID"
    const paramColumns = "columns=height,sender,data,parameters";
    const requestUrl = this.tzStatsApiUrl + apiOpTableEndpoint + paramReceiver + "&" + paramLimit + "&" + paramColumns;
    this.httpClient.get<Array<Array<any>>>(requestUrl).subscribe(response => {
      const msgOperations: Array<MsgOperation> = [];
      response.forEach((resp: Array<any>) => {
        const operation = new MsgOperation(...resp as [number, string, string, string]);
        if (operation.invokedEntrypoint === this.entrypointMessage) {
          msgOperations.push(operation);
        }
      })
      $response.next(msgOperations)
    }, err => {
      this.notifyService.notify("Couldn't retrieve message data for contract " + address);
    });
    return $response;
  }

  public checkIfContractExists(address: string): boolean {
    return true;
  }
}
