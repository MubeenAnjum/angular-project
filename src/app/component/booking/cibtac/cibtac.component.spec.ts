import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CibtacComponent } from './cibtac.component';

describe('CibtacComponent', () => {
  let component: CibtacComponent;
  let fixture: ComponentFixture<CibtacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CibtacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CibtacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
