import { Injectable, OnInit } from '@angular/core';
import { DialogService } from '../dialogService/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService implements OnInit {

  constructor(private dialogService: DialogService) { }

  private storedAddresses: Array<string>;

  public get getStoredAddresses(): Array<string> {
    return this.storedAddresses;
  }

  public addAddressToStorage(address: string): void {
    if (!this.storedAddresses.includes(address)) {
      this.storedAddresses.push(address);
      localStorage.setItem('StoredAddresses', JSON.stringify(this.storedAddresses));
    } else {
      this.dialogService.notify("This address is already stored in your favorites!");
    }
  }

  ngOnInit(): void {
    const stored = JSON.parse(localStorage.getItem('StoredAddresses') as string)
    this.storedAddresses = stored ? stored : [];
  }
}
