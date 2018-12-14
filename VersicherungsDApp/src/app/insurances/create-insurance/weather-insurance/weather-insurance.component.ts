import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Web3Service} from '../../../providers/web3.service';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {BackendService} from '../../../providers/backend.service';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import {Router} from '@angular/router';

@Component({
  selector: 'app-weather-insurance',
  templateUrl: './weather-insurance.component.html',
  styleUrls: ['./weather-insurance.component.css']
})
export class WeatherInsuranceComponent implements OnInit {
  public weatherInsuranceFormGroup: FormGroup;

  hoveredDate: NgbDate;

  public fromDate: NgbDate;
  public toDate: NgbDate;

  private txhash: string;

  public loading = false;

  private timer = null;
  private timerSubscription = null;

  public status = null;

  public textPlace = 'Urlaubsort auswählen';
  public placeSelections = ['Mallorca', 'Ibiza', 'London'];

  public textTrigger = 'Niederschlagsmenge auswählen';
  public selectedTrigger = null;

  public triggerSelections = [
    {
      text: 'mindestens 2 liter/m² - Leichter Regen',
      trigger: 2
    },
    {
      text: 'mindestens 5 liter/m² - Mäßiger Regen',
      trigger: 5
    },
    {
      text: 'mindestens 8 liter/m² - Starker Regen',
      trigger: 8
    }
  ];

  private currentConfiguration = null;

  private configuration = null;
  public offerInETH = null;
  public offerInEUR = null;

  constructor(
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private ngbDatepickerConfig: NgbDatepickerConfig,
    private backendService: BackendService,
    private router: Router
  ) {
    // const now = new Date();
    // ngbDatepickerConfig.minDate = {
    //   year: now.getFullYear(),
    //   month: now.getMonth() + 1,
    //   day: now.getDate() + 1
    // };
  }

  ngOnInit() {
    this.initFormGroup();
  }

  /*
  Initializing FormGroup and setting Validators
   */
  private initFormGroup() {
    this.weatherInsuranceFormGroup = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      payout: ['', Validators.required],
      etherPriceInEUR: ['']
    });
  }

  public getPrice() {
    this.configuration = {
      'holidayStart': Math.round(+new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day + 1) / 1000),
      'holidayEnd': Math.round(+new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day + 1) / 1000),
      'holidayDestination': this.textPlace,
      'rainfallTrigger': this.selectedTrigger,
      'desiredInsurancePayout': this.weatherInsuranceFormGroup.value.payout
    };
    this.calcEURinETH(this.configuration.desiredInsurancePayout);
    this.backendService.getOfferForConfig(this.configuration).subscribe((offer) => {
      this.offerInEUR = offer.offerInEUR;
      this.offerInETH = offer.offerInETH;
    });
  }

  public payConfigAndOffer() {
    if (this.configuration != null) {
      this.web3Service.payConfigAndOffer(this.configuration, this.offerInETH, this.weatherInsuranceFormGroup.value.etherPriceInEUR).then((result) => {
        this.router.navigate(['/my-insurances']);
      });
    }
  }

  public calcEURinETH(priceToCalculate: any) {
    this.backendService.getCurrentPriceOfEtherInEUR().subscribe((eurPrice) => {
      let result = ((priceToCalculate / eurPrice.data.quotes.EUR.price)).toString();

      this.weatherInsuranceFormGroup.patchValue({
        etherPriceInEUR: result
      });
    });
  }

  /*
  Functions for Datepicker with range
   */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
