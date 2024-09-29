import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryNewComponent } from './sub-category-new.component';

describe('SubCategoryNewComponent', () => {
  let component: SubCategoryNewComponent;
  let fixture: ComponentFixture<SubCategoryNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
