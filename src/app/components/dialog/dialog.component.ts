import { Component, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  public static currentRequestTemplate: TemplateRef<any> | undefined;
  public static currentMessage: string | undefined;

  public get getCurrentMessage() {
    return DialogComponent.currentMessage;
  }

  public get getCurrentRequestTemplate(): TemplateRef<any> {
    return DialogComponent.currentRequestTemplate as TemplateRef<any>;
  };

  public static clearDialogComponent(): void {
    DialogComponent.currentMessage = DialogComponent.currentRequestTemplate = undefined;
  }
}
