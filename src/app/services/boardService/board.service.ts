import { Injectable } from '@angular/core';
import { Dimension } from 'src/app/models/dimension';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public boardSize: Dimension;
}
