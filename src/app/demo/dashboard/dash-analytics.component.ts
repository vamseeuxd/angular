// angular import
import { Component, inject, TemplateRef } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';



export interface ICategory {
  id: string;
  title: string;
  text: string;
  img: string;
  position: number;
}

@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [SharedModule, NgbModalModule, FormsModule],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent {
  private modalService = inject(NgbModal);
  editCardTitle = 'Edit Category';
  readonly idealCard: ICategory = {
    id: '',
    title: '',
    text: '',
    img: '',
    position: 0
  };
  editCard: ICategory = {
    id: '',
    title: '',
    text: '',
    img: '',
    position: 0
  };
  isEdit = false;

  openAddOrEditModal(content: TemplateRef<any>, editCard: ICategory, isEdit = true) {
    this.editCard = editCard;
    this.editCardTitle = isEdit ? 'Edit Category' : 'Add New Category';
    this.isEdit = isEdit;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  update(form: NgForm) {
    if (this.isEdit) {
      this.cards = this.cards.map((card) => {
        if (card.id === form.value.id) {
          return form.value;
        }
        return card;
      });
    } else {
      const newCategory: ICategory = form.value;
      newCategory.position = this.cards.length;
      newCategory.id = new Date().getTime().toString();
      this.cards.push(newCategory);
    }
    form.resetForm();
    this.cards.sort((a, b) => (a.position > b.position ? 1 : -1));
    this.modalService.dismissAll();
  }

  moveNext(index: number) {
    this.cards[index].position = this.cards[index].position + 1;
    this.cards[index + 1].position = this.cards[index + 1].position - 1;
    this.cards.sort((a, b) => (a.position > b.position ? 1 : -1));
  }

  movePrevious(index: number) {
    this.cards[index - 1].position = this.cards[index - 1].position + 1;
    this.cards[index].position = this.cards[index].position - 1;
    this.cards.sort((a, b) => (a.position > b.position ? 1 : -1));
  }

  remove(index: number) {
    if (confirm('Are your sure! Do you want to delete?')) {
      this.cards.splice(index, 1);
      this.cards.forEach((card, i) => {
        card.position = i;
      });
      this.cards.sort((a, b) => (a.position > b.position ? 1 : -1));
    }
  }

  cards: ICategory[] = [
    {
      id: '1',
      title: 'Car Seat Covers',
      text: `Upgrade your vehicle's interior with our stylish and durable car seat covers. Designed to protect your seats from spills, stains, and daily wear, our covers offer both functionality and aesthetic appeal. Choose from a variety of materials, including sleek leather, robust fabric, and breathable mesh, each available in numerous colors and patterns to match your personal style. Explore our photo gallery to discover the perfect car seat covers that blend comfort, protection, and elegance for your car's interior.`,
      img: '1QaOQlZDb9WdjzEg33h0DoKdgxgwHQSsc',
      position: 0
    },
    {
      id: '2',
      title: 'Car Floor Mats',
      text: `Keep your vehicle's interior clean and stylish with our premium car floor mats. Designed to provide maximum protection against dirt, spills, and wear, our collection features a variety of materials and designs to suit every taste. Whether you prefer the rugged durability of all-weather mats or the plush comfort of carpeted options, we've got you covered. Browse through our photo gallery to find the perfect floor mats that combine functionality with aesthetics, ensuring your car stays pristine and elegant.`,
      img: '1Q0JatssAOk80fDRpscCabDqHf_OVQQ8r',
      position: 1
    },
    {
      id: '3',
      title: 'Elegant Body Cover',
      text: `Protect your vehicle with our elegant body covers, designed to combine style and functionality. Our high-quality covers provide superior protection against dust, dirt, rain, and UV rays, keeping your car looking pristine in any weather. Available in various sizes and colors, these covers are tailored to fit your car snugly, ensuring full coverage and a sleek appearance. Explore our photo gallery to see the elegant designs and choose the perfect body cover to safeguard your car while adding a touch of sophistication.`,
      img: '1Bi9LE_mK4QkpNZfD2akoSvVFbWln3_do',
      position: 2
    },
    {
      id: '4',
      title: 'Car Pillows',
      text: `Add comfort and style to your driving experience with our luxurious car pillows. Designed to provide excellent support for your neck and back, our pillows are crafted from high-quality materials that ensure durability and comfort. Available in a range of shapes, sizes, and designs, these pillows not only enhance your car's interior but also make long drives more enjoyable. Click through our photo gallery to discover the perfect car pillows that blend comfort with elegance, elevating your ride to a new level of relaxation.`,
      img: '1kH5uNAH2_tJ1sJx4osso5cYjiip6_HQ0',
      position: 3
    }
  ];

}
