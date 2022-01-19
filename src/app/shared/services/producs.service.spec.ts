import { TestBed } from '@angular/core/testing';
import { ProductsService } from './producs.service';


describe('ProducsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
