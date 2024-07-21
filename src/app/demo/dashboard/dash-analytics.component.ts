// angular import
import { Component, inject, TemplateRef } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryCardComponent } from 'src/app/category-card/category-card.component';
import { AddOrEditCategoryModalComponent } from 'src/app/add-or-edit-category-modal/add-or-edit-category-modal.component';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppService } from 'src/app/app.service';

export interface ICategory {
  id: string;
  title: string;
  text: string;
  color: string;
  img: string;
  category?: string;
  position: number;
}

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule, NgbModalModule, FormsModule, CategoryCardComponent, AddOrEditCategoryModalComponent],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent {
  appService = inject(AppService);
  private modalService = inject(NgbModal);
  private firestore = inject(AngularFirestore);

  readonly idealCard: ICategory = {
    id: '',
    title: '',
    text: '',
    img: '',
    color: '',
    position: 0
  };

  isEdit = false;
  cards: ICategory[] = [];

  ngOnInit() {
    this.firestore.collection<ICategory>('categories').valueChanges({ idField: 'id' }).subscribe(data => {
      this.cards = data.sort((a, b) => a.position - b.position);
    });
  }

  openAddOrEditModal(editCard: ICategory, isEdit = true) {
    this.isEdit = isEdit;
    const modalRef = this.modalService.open(AddOrEditCategoryModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
    modalRef.componentInstance.category = editCard;
    modalRef.componentInstance.title = isEdit ? 'Edit Category' : 'Add New Category';

    const sub1: Subscription = modalRef.componentInstance.update.subscribe((form: NgForm) => {
      this.updateCategory(form);
    });
    const sub2: Subscription = modalRef.closed.subscribe(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  }

  private updateCategory(form: NgForm) {
    if (this.isEdit) {
      this.firestore.collection('categories').doc(form.value.id).update(form.value);
    } else {
      const newCategory: ICategory = { ...form.value, id: this.firestore.createId(), position: this.cards.length };
      this.firestore.collection('categories').doc(newCategory.id).set(newCategory);
    }
    form.resetForm();
    this.sortCards();
    this.modalService.dismissAll();
  }

  moveNext(index: number) {
    this.swapPositions(index, index + 1);
  }

  movePrevious(index: number) {
    this.swapPositions(index, index - 1);
  }

  private swapPositions(currentIndex: number, targetIndex: number) {
    [this.cards[currentIndex].position, this.cards[targetIndex].position] = [this.cards[targetIndex].position, this.cards[currentIndex].position];
    this.sortCards();
    this.updatePositions();
  }

  remove(index: number) {
    if (confirm('Are you sure you want to delete?')) {
      const cardId = this.cards[index].id;
      this.firestore.collection('categories').doc(cardId).delete();
      this.cards.splice(index, 1);
      this.reorderPositions();
    }
  }

  private reorderPositions() {
    this.cards.forEach((card, index) => card.position = index);
    this.sortCards();
    this.updatePositions();
  }

  private sortCards() {
    this.cards.sort((a, b) => a.position - b.position);
  }

  private updatePositions() {
    this.cards.forEach(card => {
      this.firestore.collection('categories').doc(card.id).update({ position: card.position });
    });
  }
}
