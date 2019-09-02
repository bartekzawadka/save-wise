import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import {IonSlide} from "@ionic/angular";

@Component({
    selector: 'wizard-page',
    templateUrl: './wizard-page.component.html',
    styleUrls: ['./wizard-page.component.scss']
})
export class WizardPageComponent implements OnInit {
    @ContentChild(IonSlide) ionSlide: IonSlide;
    @Input() canGoNext: boolean = true;
    @Input() validate: string;
    @Input() title = "";
    @Output() onContentUpdated = new EventEmitter();

    constructor(private renderer: Renderer2, private hostRef: ElementRef) {
    }

    ngOnInit() {
        this.renderer.addClass(this.hostRef.nativeElement, 'swiper-slide');
    }

    contentChanged(){
        let timeout = setTimeout(()=>{
            this.onContentUpdated.emit();
            clearTimeout(timeout);
        }, 500);
    }
}
