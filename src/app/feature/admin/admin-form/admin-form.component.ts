import { Component } from '@angular/core';
import {ActivatedRoute, UrlTree} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { isEqual } from 'lodash'

import {ProductsService} from "../../../shared/services/producs.service";
import {ProductModel} from "../../../shared/models";
import {map, Observable} from "rxjs";
import {DialogService} from "../../../core/services/dialog.service";
import {CanComponentDeactivate} from "../../../core/interfaces/can-component-deactivate.interface";
import {LocalStorageService} from "../../../core/services/local-storage.service";

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements CanComponentDeactivate {

  productForm!: FormGroup;
  initialFormValue!: ProductModel;
  isFormEqual: boolean = true;
  storagePrefix = 'admin-form';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageService
    ) {
  }

  ngOnInit() {
    this.initForm();
    this.patchForm();
    this.initialFormValue = this.productForm.value;
    this.compareFormValue();
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.localStorageService.clearData(this.storagePrefix)
    if (this.isFormEqual) {
      return true
    }
    return this.dialogService.confirm('Discard changes?');
  }

  initForm() {
    this.productForm = this.fb.group({
      id: null,
      name: [null, Validators.required],
      image: [null, Validators.required],
      price: [null, Validators.required],
      isAvailable: false
    })
  }

  onSubmit(): void {
    this.productsService.addProduct(this.productForm.value)
  }

  private patchForm(): void {
    const formValue = this.localStorageService.getData(this.storagePrefix);
    if(formValue) {
      return this.productForm.patchValue(formValue);
    }
    if(this.route.snapshot.routeConfig?.path?.includes('edit')) {
      this.route.data.pipe(map(data => data['product'])).subscribe((product) => {
        product && this.productForm.patchValue(product);
      });
    }
  }

  private isValueChanged(fromValue: ProductModel): boolean {
    return isEqual(fromValue, this.initialFormValue)
  }

  private compareFormValue(): void {
    this.productForm.valueChanges.subscribe(value => {
      this.isFormEqual = this.isValueChanged(value);
      this.localStorageService.setData(this.storagePrefix, value)
    })
  }

  get isFormValid() {
    return this.productForm.valid
  }
}
