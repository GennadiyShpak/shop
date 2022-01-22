import { Pipe, PipeTransform } from '@angular/core';
import {CartProductModel} from "../models/product-model";
import {CartListSelectEnum} from "../models/ng-select-types";


@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(productList: CartProductModel[], key: CartListSelectEnum = CartListSelectEnum.name, isAsc: boolean = false) {
    const isValueNumber = productList.some((product) => (typeof product[key] === 'number'));
    let compareList!: CartProductModel[];

    if (isValueNumber) {
      compareList = [...productList].sort((a, b) => Number(b[key]) - Number(a[key]));
    } else {
      compareList = [...productList].sort((a, b) => a[key].toString().localeCompare(b[key].toString()));
    }
    return  isAsc ? compareList : compareList.reverse()
  }
}
