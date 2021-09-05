import { Component, ElementRef, Inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  public displayForm(template: TemplateRef<any>): void {
    DialogComponent.currentRequestTemplate = template;
    const dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe(result => {
      DialogComponent.currentRequestTemplate = undefined;
    });
  }
}