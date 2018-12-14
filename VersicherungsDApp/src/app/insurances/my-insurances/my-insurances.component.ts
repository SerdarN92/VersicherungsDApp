import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../providers/web3.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-my-insurances',
  templateUrl: './my-insurances.component.html',
  styleUrls: ['./my-insurances.component.css']
})
export class MyInsurancesComponent implements OnInit {

  public contracts = [];

  constructor(
    private web3Service: Web3Service,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
  }

  ngOnInit() {
    this.loadContractData();
  }

  private loadContractData() {
    this.contracts = [];
    this.web3Service.getAllContractsToAddress().then(contracts => {
      contracts.forEach(contract => {
        this.web3Service.collectDataToContract(contract).then(data => {
          this.contracts.push(data);
        });
      });
    });
  }

  public timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + '.' + month + '.' + year;
    return time;
  }

  public async triggerContract(contract: any) {

    await this.web3Service.triggerContract(contract).then(() => {
      this.spinnerService.show();
      setTimeout(() => {
        this.loadContractData();
      }, 30000);
    });
  }

}
