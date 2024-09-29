import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpmuDetailsComponent } from './spmu-details.component';

describe('SpmuDetailsComponent', () => {
  let component: SpmuDetailsComponent;
  let fixture: ComponentFixture<SpmuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpmuDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpmuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
