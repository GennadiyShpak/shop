import {Component, Inject, OnInit, Optional} from '@angular/core';
import {generatedString, RandomIdFactory} from "../../../core/services/random-id.factory";
import {generatedId, GeneratorService} from "../../../core/services/generator.service";
import {LocalStorageService, storage} from "../../../core/services/local-storage.service";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [
    {provide: generatedString, useFactory: RandomIdFactory(7), deps: [GeneratorService] },
    {provide: GeneratorService, useValue: generatedId},
    {provide: LocalStorageService, useValue: storage}
  ]
})
export class FirstComponent {

  constructor(
    @Optional()  @Inject(generatedString) private randomId: string,
    @Optional()  private generatorService: GeneratorService,
    @Optional()  private localStorageService: LocalStorageService
  ) { }

  getStorageData(): any {
    return this.localStorageService?.getData('productList') ?? 'No data in LocalStorage'
  }

  getRandomToken(): string {
    return this.randomId ?? 'abcdefj'
  }

  getId(): number {
    return this.generatorService?.getNewID() ?? 1;
  }
}
