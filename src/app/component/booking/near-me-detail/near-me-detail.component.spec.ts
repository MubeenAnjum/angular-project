import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearMeDetailComponent } from './near-me-detail.component';

describe('NearMeDetailComponent', () => {
  let component: NearMeDetailComponent;
  let fixture: ComponentFixture<NearMeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearMeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NearMeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
