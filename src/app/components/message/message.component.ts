import { Component, Input, OnInit } from '@angular/core';
import { MsgOperation } from 'src/app/models/msgOperation';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor() { }

  @Input()
  message: MsgOperation;

  ngOnInit(): void {
  }

}
