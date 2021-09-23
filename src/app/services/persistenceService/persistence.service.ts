import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { TemplateStorage } from 'src/assets/templateStorage';
import { DialogService } from '../dialogService/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  private storedAddresses: Array<string>;

  constructor(private dialogService: DialogService) {
    const stored = JSON.parse(localStorage.getItem('StoredAddresses') as string)
    this.storedAddresses = stored ? stored : [];
  }

  public get getStoredAddresses(): Array<string> {
    return this.storedAddresses;
  }

  public removeAddressFromStorage(address: string): void {
    this.storedAddresses = this.storedAddresses.filter((address: string) => address !== address);
    localStorage.setItem('StoredAddresses', JSON.stringify(this.storedAddresses));
  }

  public addAddressToStorage(address: string): boolean {
    if (!TemplateStorage.trustedContracts.includes(address)) {
      if (!this.storedAddresses.includes(address)) {
        this.storedAddresses.push(address);
        localStorage.setItem('StoredAddresses', JSON.stringify(this.storedAddresses));
        return true;
      }
    } else {
      this.dialogService.notify("This is a default contract which is always added to your favourites!");
      return true;
    }
    return false;
  }
}
