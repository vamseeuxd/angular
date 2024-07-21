import { CommonModule } from '@angular/common';
import { Component, inject, input, model, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  appService = inject(AppService);
  headerColor = model.required<string>();
  title = model.required<string>();
  catId = input<string>('');
  isProduct = input<boolean>(true);
  description = model.required<string>();
  img = model.required<string>();
  last = model.required<boolean>();
  first = model.required<boolean>();
  isPreview = input<boolean>(false);
  movePrevious = output();
  edit = output();
  remove = output();
  moveNext = output();
  showImage = output();
}
