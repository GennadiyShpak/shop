import { Injectable } from '@angular/core';
import type { CanDeactivate, UrlTree } from '@angular/router';
// rxjs
import type { Observable } from 'rxjs';
// тут тоже можно добавить type
import type {CanComponentDeactivate} from "../interfaces/can-component-deactivate.interface";
@Injectable({
  providedIn: 'root'
})

export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate?.() ?? true;
  }
}
