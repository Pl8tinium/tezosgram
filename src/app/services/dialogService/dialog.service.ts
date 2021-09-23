import { Component, ElementRef, Inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public currentDialog: MatDialogRef<DialogComponent, any>;

  public notify(msg: string) {
    this.closePreviousDialogs();
    console.info(msg);
    DialogComponent.clearDialogComponent();
    DialogComponent.currentMessage = msg;
    this.currentDialog = this.dialog.open(DialogComponent);
  }

  private closePreviousDialogs(): void {
    if (this.currentDialog) {
      this.currentDialog.close();
    }
  }

  public displayForm(template: TemplateRef<any>): MatDialogRef<DialogComponent, any> {
    this.closePreviousDialogs();
    DialogComponent.clearDialogComponent();
    DialogComponent.currentRequestTemplate = template;
    const dialog = this.dialog.open(DialogComponent);
    this.currentDialog = dialog;
    return dialog;
  }
}