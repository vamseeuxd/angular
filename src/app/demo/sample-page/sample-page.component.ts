// angular import
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICategory } from '../dashboard/dash-analytics.component';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AddOrEditCategoryModalComponent } from 'src/app/add-or-edit-category-modal/add-or-edit-category-modal.component';
import { CategoryCardComponent } from 'src/app/category-card/category-card.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule, RouterModule, FormsModule, CategoryCardComponent, AddOrEditCategoryModalComponent],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss']
})
export default class SamplePageComponent {
  appService = inject(AppService);
  private modalService = inject(NgbModal);
  private firestore = inject(AngularFirestore);
  category: ICategory | undefined;
  selectedProduct: ICategory | undefined;
  products: ICategory[] = [];

  readonly idealProduct: ICategory = {
    id: '',
    title: '',
    text: '',
    img: '',
    color: '',
    category: '',
    position: 0
  };

  isEdit = false;

  constructor() {
    effect(() => {
      console.log(this.id());
      this.idealProduct.category = this.id();
      this.getCategoryById(this.id());
      this.getProducts(this.id());
    });
  }
  getProducts(categoryId: string) {
    this.firestore
      .collection<ICategory>('products', (ref) => ref.where('category', '==', categoryId))
      .valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.products = data.sort((a, b) => a.position - b.position);
      });
  }
  getCategoryById(id: string) {
    this.firestore
      .collection('categories')
      .doc(id)
      .valueChanges()
      .subscribe((category: any) => {
        if (category) {
          this.category = category;
          // Do something with the retrieved category
        } else {
          console.log('No category found with the given ID');
        }
      });
  }
  id = input('');

  openAddOrEditModal(editCard: ICategory, isEdit = true) {
    this.isEdit = isEdit;
    const modalRef = this.modalService.open(AddOrEditCategoryModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
    modalRef.componentInstance.category = editCard;
    modalRef.componentInstance.title = isEdit ? 'Edit Product' : 'Add New Product';
    modalRef.componentInstance.moduleTitle = 'Product';

    const sub1: Subscription = modalRef.componentInstance.update.subscribe((form: NgForm) => {
      this.updateProduct(form);
    });
    const sub2: Subscription = modalRef.closed.subscribe(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    });
  }

  private updateProduct(form: NgForm) {
    if (this.isEdit) {
      this.firestore.collection('products').doc(form.value.id).update(form.value);
    } else {
      const newProduct: ICategory = { ...form.value, id: this.firestore.createId(), position: this.products.length };
      this.firestore.collection('products').doc(newProduct.id).set(newProduct);
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
    [this.products[currentIndex].position, this.products[targetIndex].position] = [
      this.products[targetIndex].position,
      this.products[currentIndex].position
    ];
    this.sortCards();
    this.updatePositions();
  }

  remove(index: number) {
    if (confirm('Are you sure you want to delete?')) {
      const cardId = this.products[index].id;
      this.firestore.collection('products').doc(cardId).delete();
      this.products.splice(index, 1);
      this.reorderPositions();
    }
  }

  private reorderPositions() {
    this.products.forEach((card, index) => (card.position = index));
    this.sortCards();
    this.updatePositions();
  }

  private sortCards() {
    this.products.sort((a, b) => a.position - b.position);
  }

  private updatePositions() {
    this.products.forEach((product) => {
      this.firestore.collection('products').doc(product.id).update({ position: product.position });
    });
  }
}
