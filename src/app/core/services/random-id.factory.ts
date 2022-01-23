import {GeneratorService} from "./generator.service";
import {InjectionToken} from "@angular/core";

export const generatedString = new InjectionToken<string>('generatedString');

export function RandomIdFactory(idLength: number): (genId: GeneratorService) => string {
  return (genId: GeneratorService): string =>
    genId.generate(idLength);
}
