import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const airports = ['Leipzig Halle Airport', 'Stuttgart Airport', 'Brussels Airport', 'Dresden Airport',
  'Frankfurt am Main International Airport', 'Hamburg Airport', 'Cologne Bonn Airport', 'Dusseldorf International Airport'
];

@Component({
  selector: 'app-flight-insurance',
  templateUrl: './flight-insurance.component.html',
  styleUrls: ['./flight-insurance.component.css']
})
export class FlightInsuranceComponent implements OnInit {
  public flightInsuranceFormGroup: FormGroup;
  public airports: string[];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : airports.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpClient
  ) {
  }

  ngOnInit() {
    this.initFormGroup();
    this.loadAirports();
  }

  private loadAirports() {
    this.httpService.get('./assets/data/airports.json').subscribe(data => {
      this.airports = data as string[];
    });
  }

  private initFormGroup() {
    this.flightInsuranceFormGroup = this.formBuilder.group({
      prename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dateOfDeparture: ['', [Validators.required]],
      departureAirport: ['', [Validators.required]],
      arrivalAirport: ['', [Validators.required]]
    });
  }

}
