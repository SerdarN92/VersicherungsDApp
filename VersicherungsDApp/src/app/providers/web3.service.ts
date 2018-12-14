import {Injectable} from '@angular/core';

const Web3 = require('web3');
const ethers = require('ethers');

declare let window: any; 
declare let require: any;

const insuranceRegistryContractAbi = require('./insuranceRegistry.contract.abi.json');
const weatherInsuranceContractAbi = require('./weatherInsurance.contract.abi.json');
const insuranceRegistryAddress = '0xb9aeeda583c62fdd8af5bb4cec3906bff2c9e66a';

@Injectable()
export class Web3Service {

  private _account: any;
  private _web3: any;
  private _insuranceRegistry: any = null;

  constructor() {
    this.initializeWeb3();
  }

  initializeWeb3() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._insuranceRegistry = new this._web3.eth.Contract(insuranceRegistryContractAbi, insuranceRegistryAddress);
    } else {
      console.log('No provider found! Please install a provider like MetaMask');
    }
  }

  public async getAccount(): Promise<any> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, result) => {
          if (err != null) {
            return reject(err);
          }
          return resolve(result);
        });
      }) as string;
    }
    return Promise.resolve(this._account);
  }

  public async getBalanceToAccount(account: any): Promise<any> {
    return await new Promise((resolve, reject) => {
      this._web3.eth.getBalance(account, (err, result) => {
        if (err != null) {
          return reject(err);
        }
        return resolve(this._web3.utils.fromWei(result.toString(), 'ether'));
      });
    }) as any;
  }

  public async payConfigAndOffer(configuration: any, payment: any, payout: any): Promise<any> {
    const account = await this.getAccount();
    const decimalPlaces = 18;

    let payoutEther = payout.toString().split(',');
    payoutEther = ethers.utils.parseUnits(payoutEther[0].toString(), decimalPlaces);

    const paymentEther = ethers.utils.parseUnits(payment.toString(), decimalPlaces);
    let gasPrice = 0;
    await new Promise((resolve, reject) => {
      console.log(this._insuranceRegistry);
      this._insuranceRegistry.methods.payConfigAndOffer(configuration.holidayStart, configuration.holidayEnd,
        configuration.holidayDestination, configuration.rainfallTrigger.toString(), payoutEther)
        .estimateGas({
          from: account[0],
          value: paymentEther
        }, function (error, estimatedGas) {
          if (error !== null) {
            console.log(error);
          }
          gasPrice = estimatedGas;
          resolve();
        });
    });
    return this._insuranceRegistry.methods.payConfigAndOffer(configuration.holidayStart, configuration.holidayEnd,
      configuration.holidayDestination, configuration.rainfallTrigger.toString(), payoutEther)
      .send(
        {
          from: account[0],
          value: paymentEther,
          gas: gasPrice
        }).on('transactionHash', function (hash) {
        console.log(hash);
      }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
      }).on('error', function (error) {
        console.log(error);
        return reject(error);
      })  as any;
  }

  public async getAllContractsToAddress(): Promise<any> {
    const account = await this.getAccount();
    return new Promise((resolve, reject) => {
      this._insuranceRegistry.methods.getContractsToAddress()
        .call(
          {
            from: account[0]
          }
        ).then((result) => {
        resolve(result);
      }).catch(error => reject(error));
    })as any;
  }

  public async collectDataToContract(contract: any) {
    const contractFromAddress = new this._web3.eth.Contract(weatherInsuranceContractAbi, contract);
    const data = [];
    data.push(contract);
    data.push(await contractFromAddress.methods.startDate().call());
    data.push(await contractFromAddress.methods.endDate().call());
    data.push(await contractFromAddress.methods.place().call());
    data.push(await contractFromAddress.methods.trigger().call());
    await contractFromAddress.methods.checkPayout().call(function (error, result) {
      data.push(result);
    });
    data.push(await contractFromAddress.methods.payoutCustomer().call());
    data.push(await contractFromAddress.methods.payoutInsurance().call());
    return data;
  }

  public async triggerContract(contract: any): Promise<any> {
    const account = await this.getAccount();
    const contractFromAddress = new this._web3.eth.Contract(weatherInsuranceContractAbi, contract);

    let gasPrice = 0;
    await new Promise((resolve, reject) => {
      contractFromAddress.methods.isTriggered()
        .estimateGas({
          from: account[0]
        }, function (error, estimatedGas) {
          if (error !== null) {
            console.log(error);
          }
          gasPrice = estimatedGas;
          resolve();
        });
    });
    return new Promise((resolve, reject) => {
      contractFromAddress.methods.isTriggered()
        .send(
          {
            from: account[0],
            gasPrice: gasPrice
          }).on('transactionHash', function (hash) {
        console.log(hash);
      }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
      }).on('error', function (error) {
        return reject(error);
      });
    }) as any;
  }


}
