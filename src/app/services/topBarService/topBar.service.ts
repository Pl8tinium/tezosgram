import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopBarService {
  private _topBarHeight: number;

  public set setTopBarHeight(height: number) {
    this._topBarHeight = height;
  }

  public get topBarHeight() {
    return this._topBarHeight;
  }

  constructor() { }
}
