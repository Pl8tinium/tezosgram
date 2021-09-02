import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  public notify(msg: string) {
    // smth like a pop up
  }
}
