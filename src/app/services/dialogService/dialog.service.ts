import { Component, ElementRef, Inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public notify(msg: string) {
    console.info(msg);
    DialogComponent.currentMessage = msg;
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(result => {
      DialogComponent.currentMessage = undefined;
    });
  }

  public displayForm(template: TemplateRef<any>): MatDialogRef<DialogComponent, any> {
    DialogComponent.currentRequestTemplate = template;
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(result => {
      DialogComponent.currentRequestTemplate = undefined;
    });
    return dialog;
  }
}