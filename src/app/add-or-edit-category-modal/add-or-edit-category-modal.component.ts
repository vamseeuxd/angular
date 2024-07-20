import { Component, EventEmitter, inject, input, Input, model, Output, output } from '@angular/core';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ICategory } from '../demo/dashboard/dash-analytics.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-add-or-edit-category-modal',
  standalone: true,
  imports: [NgbModalModule, FormsModule, CategoryCardComponent],
  templateUrl: './add-or-edit-category-modal.component.html',
  styleUrl: './add-or-edit-category-modal.component.scss'
})
export class AddOrEditCategoryModalComponent {
  activeModal = inject(NgbActiveModal);
  @Input() title = '';
  @Input() category: ICategory = {
    id: '',
    title: '',
    text: '',
    img: '',
    color: '',
    position: 0
  };
  @Output() update: EventEmitter<NgForm> = new EventEmitter();
}
