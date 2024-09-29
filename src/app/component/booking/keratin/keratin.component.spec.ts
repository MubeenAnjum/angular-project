import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeratinComponent } from './keratin.component';

describe('KeratinComponent', () => {
  let component: KeratinComponent;
  let fixture: ComponentFixture<KeratinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeratinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeratinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
