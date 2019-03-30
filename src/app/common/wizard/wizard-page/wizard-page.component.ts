import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter, Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';
import {IonSlide} from "@ionic/angular";
import {Renderer3} from "@angular/core/src/render3/interfaces/renderer";

@Component({
  selector: 'wizard-page',
  templateUrl: './wizard-page.component.html',
  styleUrls: ['./wizard-page.component.scss']
})
export class WizardPageComponent implements OnInit {
  @ContentChild(IonSlide) ionSlide: IonSlide;
  @Input() canGoNext : boolean = true;

  constructor(private renderer: Renderer2, private hostRef: ElementRef) { }

  ngOnInit() {
    this.renderer.addClass(this.hostRef.nativeElement, 'swiper-slide');
  }
}
