import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTrialComponent } from './test-trial.component';

describe('TestTrialComponent', () => {
  let component: TestTrialComponent;
  let fixture: ComponentFixture<TestTrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
