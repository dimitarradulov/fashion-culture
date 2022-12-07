import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'quantity-field',
  templateUrl: './quantity-field.component.html',
  styleUrls: ['./quantity-field.component.scss'],
})
export class QuantityFieldComponent implements OnInit {
  @Output() quantityChange = new EventEmitter<number>();
  @Input() quantity: number;

  constructor() {}

  ngOnInit(): void {
    if (!this.quantity) this.quantity = 1;
  }

  onQuantityChange(action: string) {
    if (action === 'increase') {
      this.quantityChange.emit(this.quantity + 1);
    }

    if (action === 'decrease' && this.quantity > 1) {
      this.quantityChange.emit(this.quantity - 1);
    }
  }
}
