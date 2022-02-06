import { Directive, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlighting]'
})
export class HighlightingDirective {
  @Input() isPhoneInCart!: boolean

  @HostBinding('style.backgroundColor') componentsClass!: string;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.isPhoneInCart) {
      this.componentsClass = '#d4f0f5';
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isPhoneInCart) {
      this.componentsClass = '';
    }
  }
}
