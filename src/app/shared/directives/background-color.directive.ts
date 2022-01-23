import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BackgroundColorDirective {

  @Input('appBgColor') color!: string;

  private isDirectiveUses: boolean = false;

  constructor(
    private  el: ElementRef,
    private renderer: Renderer2
    ) { }

  @HostListener('click')
  onClick() {
    this.increaseFZ(this.color)
  }

  private increaseFZ(color: string, defaultColor: string = "white") {
    this.isDirectiveUses = !this.isDirectiveUses;

    let currentBorderColor = this.isDirectiveUses ? color : defaultColor;

    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor' , currentBorderColor);
  }
}
