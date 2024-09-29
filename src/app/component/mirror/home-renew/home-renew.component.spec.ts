import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRenewComponent } from './home-renew.component';

describe('HomeRenewComponent', () => {
  let component: HomeRenewComponent;
  let fixture: ComponentFixture<HomeRenewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRenewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
