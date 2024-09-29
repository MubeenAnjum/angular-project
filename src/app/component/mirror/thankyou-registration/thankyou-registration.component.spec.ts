import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankyouRegistrationComponent } from './thankyou-registration.component';

describe('ThankyouRegistrationComponent', () => {
  let component: ThankyouRegistrationComponent;
  let fixture: ComponentFixture<ThankyouRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankyouRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankyouRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
