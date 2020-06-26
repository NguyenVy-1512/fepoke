import { ChangeDetectionStrategy, Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductQuantityComponent implements OnInit {
  @Input() Counter: number;
  @Input() id: number;
  @Input() flag: boolean;
  @Output() valueChange = new EventEmitter<number>();
  @Output() valueChange1 = new EventEmitter<number>();
  @Output() valueChange2 = new EventEmitter<number>();
  @Output() valueChange3 = new EventEmitter<number>();
  productlist: string[];
  quantity: number[];
  constructor(private data: DataService) { }
  ngOnInit() {
  }
  Incre() {
    this.Counter = this.Counter + 1;
    this.valueChange.emit(this.id);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    this.quantity[this.id] = this.Counter;
    this.data.changQuantity(this.quantity);
  }

  Decre() {
    this.Counter = this.Counter - 1;
    this.valueChange1.emit(this.id);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    this.quantity[this.id] = this.Counter;
    this.data.changQuantity(this.quantity);
  }

  Incre1() {
    this.Counter = this.Counter + 1;
    this.valueChange2.emit(this.id);
  }

  Decre1() {
    this.Counter = this.Counter - 1;
    this.valueChange3.emit(this.id);
  }
}
