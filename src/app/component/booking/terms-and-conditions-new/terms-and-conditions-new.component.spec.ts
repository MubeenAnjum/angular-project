import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndConditionsNewComponent } from './terms-and-conditions-new.component';

describe('TermsAndConditionsNewComponent', () => {
  let component: TermsAndConditionsNewComponent;
  let fixture: ComponentFixture<TermsAndConditionsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsAndConditionsNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermsAndConditionsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
