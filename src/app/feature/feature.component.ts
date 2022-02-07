import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements AfterViewInit {
  @ViewChild('appTitle')
  title!: ElementRef<HTMLHeadingElement>;

  constructor() { }

  ngAfterViewInit(): void {
    this.title.nativeElement.innerText = 'Angular shop';
  }
}
