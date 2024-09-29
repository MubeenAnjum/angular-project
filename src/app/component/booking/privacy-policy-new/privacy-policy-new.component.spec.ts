import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyNewComponent } from './privacy-policy-new.component';

describe('PrivacyPolicyNewComponent', () => {
  let component: PrivacyPolicyNewComponent;
  let fixture: ComponentFixture<PrivacyPolicyNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
