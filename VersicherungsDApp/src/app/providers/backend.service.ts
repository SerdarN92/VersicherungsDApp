import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

const backendUrl = 'https://insurance-backend.hq-platri.de/calculatePayment';

@Injectable()
export class BackendService {

  constructor(
    private apiService: ApiService
  ) {
  }

  getOfferForConfig(configuration: any){
    return this.apiService.post(backendUrl, configuration);
  }

  getCurrentPriceOfEtherInEUR() {
    return this.apiService.get('https://api.coinmarketcap.com/v2/ticker/1027/?convert=EUR');
  }

}
