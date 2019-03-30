import {
    Component,
    EventEmitter,
    OnInit, Output,
    QueryList, ViewChild,
    ViewChildren} from '@angular/core';
import {IonSlides} from "@ionic/angular";
import {WizardPageComponent} from "../wizard-page/wizard-page.component";

@Component({
    selector: 'wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
    @ViewChildren(WizardPageComponent) wizardPages: QueryList<WizardPageComponent>;
    @ViewChild('slides') slides: IonSlides;
    @Output() onFinish: EventEmitter<any> = new EventEmitter<any>();
    public slideIndex = 0;
    public slidesLength = 0;

    public options = {};

    constructor() {
    }

    async ngOnInit() {
        this.slides.ionSlideDidChange.subscribe(() => this.onSlideDidChange());
        await this.getIndex();
        this.slidesLength = await this.slides.length();
    }

    goBack() {
        this.slides.slidePrev();
    }

    goNext() {
        if (this.isLastPage()) {
            this.onFinish.emit();
        } else {
            this.slides.slideNext();
        }
    }

    private async onSlideDidChange() {
        await this.getIndex();
    }

    private async getIndex() {
        this.slideIndex = await this.slides.getActiveIndex();
    }

    isPreviousEnabled() {
        return this.slideIndex > 0;
    }

    isNextEnabled() {
        let slide = undefined;

        if (this.wizardPages) {
            slide = this.wizardPages.find((item, index) => {
                return index === this.slideIndex;
            });
        }

        return !(this.slidesLength === 0 || (slide && !slide.canGoNext));
    }

    isLastPage() {
        return this.slideIndex === this.slidesLength - 1;
    }

    canFinish() {
        return true;
    }
}
