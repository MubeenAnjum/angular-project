import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DhaComponent } from './dha.component';

describe('DhaComponent', () => {
  let component: DhaComponent;
  let fixture: ComponentFixture<DhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
