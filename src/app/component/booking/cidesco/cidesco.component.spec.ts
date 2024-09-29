import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidescoComponent } from './cidesco.component';

describe('CidescoComponent', () => {
  let component: CidescoComponent;
  let fixture: ComponentFixture<CidescoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidescoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
