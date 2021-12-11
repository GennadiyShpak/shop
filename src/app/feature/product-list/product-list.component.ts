import { Component, OnInit } from '@angular/core';
import { ProducsService } from 'src/app/core/services/producs.service';
import { ProductModel } from '../../core/models/product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  phonesForSale: ProductModel[] = [];

  constructor(private producsService: ProducsService) { }

  ngOnInit(): void {
    this.phonesForSale = this.producsService.getProducts();
  }

}
