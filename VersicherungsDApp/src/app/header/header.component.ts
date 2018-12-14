import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../providers/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public account;
  public balance;

  constructor(
    private web3Service: Web3Service
  ) { }

  async ngOnInit() {
    const accounts = await this.web3Service.getAccount();
    this.account = accounts[0];
    this.balance = await this.web3Service.getBalanceToAccount(this.account);

  }

}
