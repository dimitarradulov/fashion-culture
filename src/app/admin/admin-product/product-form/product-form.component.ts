import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Product, Categories } from 'src/app/shared/models/product.model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  categories = Object.values(Categories);

  @Input('selected-category') selectedCategory: string | null = null;
  @Input('action-type') actionType: string;
  @Input('product-data') productData: Product;
  @Output() onSubmit = new EventEmitter<{
    name: string;
    description: string;
    imagePath: string;
    category: string;
    price: number;
  }>();

  imagePathRegex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
  priceRegex = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;

  constructor(public location: Location) {}
}
