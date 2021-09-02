import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contractService/contract.service';
import { CredService } from 'src/app/services/credService/cred.service';

@Component({
  selector: 'app-cred-selector',
  templateUrl: './credSelector.component.html',
  styleUrls: ['./credSelector.component.scss']
})
export class CredSelectorComponent implements OnInit {

  public selectedRpc: string;

  constructor(public credService: CredService, private contractTEST: ContractService) { }

  ngOnInit(): void {
  }
}
