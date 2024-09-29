import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCreateComponent } from './header-create.component';

describe('HeaderCreateComponent', () => {
  let component: HeaderCreateComponent;
  let fixture: ComponentFixture<HeaderCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
