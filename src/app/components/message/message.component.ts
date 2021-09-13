import { Component, Input, OnInit } from '@angular/core';
import { MsgOperation } from 'src/app/models/msgOperation';
import { ChainInfoService } from 'src/app/services/chainInfoService/chainInfo.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input()
  message: MsgOperation;
}
