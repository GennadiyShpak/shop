import {Injectable} from '@angular/core';
import {genID} from "./gen-id.generator.service";

@Injectable()
export class GeneratorService {

  constructor() { }

  generate(stringLength: number): string {
    const defaultCharString="abcdefghijklmnopqrstuvwxyzABDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    let generatedStr = '';
    for (let i = 0; i < stringLength; i++) {
      const pos = Math.floor(Math.random() * defaultCharString.length);
      generatedStr += defaultCharString.substring(pos,pos+1);
    }
    return generatedStr
  }

  getNewID(): number  {
    return genID()
  }
}

export const generatedId = new GeneratorService();
