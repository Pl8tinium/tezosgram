import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private dialog: MatDialog) { }

  public notify(msg: string) {
    console.info(msg);
    NotifyHtml.currentMessage = msg;
    this.dialog.open(NotifyHtml);
  }
}

// split this into a seperate component when theres a need to configure the notification
@Component({
  selector: 'notify-dialog-no-seperate-usage',
  templateUrl: 'notify.service.html',
})
export class NotifyHtml {
  public static currentMessage: string;
  public get getCurrentMessage() {
    return NotifyHtml.currentMessage;
  }
}