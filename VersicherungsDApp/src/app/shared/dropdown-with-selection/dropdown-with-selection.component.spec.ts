import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithSelectionComponent } from './dropdown-with-selection.component';

describe('DropdownWithSelectionComponent', () => {
  let component: DropdownWithSelectionComponent;
  let fixture: ComponentFixture<DropdownWithSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownWithSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownWithSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
