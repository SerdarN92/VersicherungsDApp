import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInsurancesComponent } from './my-insurances.component';

describe('MyInsurancesComponent', () => {
  let component: MyInsurancesComponent;
  let fixture: ComponentFixture<MyInsurancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInsurancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInsurancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
