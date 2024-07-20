import { CommonModule } from '@angular/common';
import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  headerColor = model.required<string>();
  title = model.required<string>();
  description = model.required<string>();
  img = model.required<string>();
  last = model.required<boolean>();
  first = model.required<boolean>();
  isPreview = input<boolean>(false);
  movePrevious = output();
  edit = output();
  remove = output();
  moveNext = output();
}
