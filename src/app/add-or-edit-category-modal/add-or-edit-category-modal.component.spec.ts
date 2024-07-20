import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCategoryModalComponent } from './add-or-edit-category-modal.component';

describe('AddOrEditCategoryModalComponent', () => {
  let component: AddOrEditCategoryModalComponent;
  let fixture: ComponentFixture<AddOrEditCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditCategoryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
