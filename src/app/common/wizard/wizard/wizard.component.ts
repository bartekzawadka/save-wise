import {
    Component, ContentChildren,
    EventEmitter, Input,
    OnInit, Output,
    QueryList, ViewChild,
} from '@angular/core';
import {IonSlides} from "@ionic/angular";
import {WizardPageComponent} from "../wizard-page/wizard-page.component";

@Component({
    selector: 'wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
    @ContentChildren(WizardPageComponent) wizardPages: QueryList<WizardPageComponent>;
    @ViewChild('slides') slides: IonSlides;
    @Output() onFinish: EventEmitter<any> = new EventEmitter<any>();
    @Output() onValidationFailed: EventEmitter<string> = new EventEmitter();
    @Input() title: string = "";

    public wizardPageTitle = "";
    public slideIndex = 0;
    public currentSlide : WizardPageComponent;
    public slidesLength = 0;

    public options = {};

    constructor() {
    }

    async ngOnInit() {
        this.slides.lockSwipes(true);
        this.slides.ionSlideDidChange.subscribe(() => this.onSlideDidChange());
        this.slides.ionSlidesDidLoad.subscribe(() => this.updateTitle());
        await this.updateCurrentSlide();
        this.slidesLength = await this.slides.length();
    }

    goBack() {
        this.slides.lockSwipes(false);
        this.slides.slidePrev();
        this.slides.lockSwipes(true);
    }

    goNext() {
        if (this.isLastPage()) {
            this.onFinish.emit();
        } else {
            let currentSlide = this.getCurrentSlide();
            let error = currentSlide.validate;
            if (currentSlide && !error) {
                this.slides.lockSwipes(false);
                this.slides.slideNext();
                this.slides.lockSwipes(true);
            } else {
                this.onValidationFailed.emit(error);
            }
        }
    }

    private async onSlideDidChange() {
        await this.updateCurrentSlide();
        this.updateTitle();
    }

    private async updateCurrentSlide() {
        this.slideIndex = await this.slides.getActiveIndex();
        this.currentSlide = this.getCurrentSlide();
    }

    isPreviousEnabled() {
        return this.slideIndex > 0;
    }

    isNextEnabled() {
        return !(this.slidesLength === 0 || (this.currentSlide && !this.currentSlide.canGoNext));
    }

    isLastPage() {
        return this.slideIndex === this.slidesLength - 1;
    }

    canFinish() {
        return true;
    }

    updateTitle() {
        if (this.currentSlide) {
            this.wizardPageTitle = this.currentSlide.title;
        }
    }

    private getCurrentSlide() {
        return this.getSlide(this.slideIndex);
    }

    private getSlide(index) {
        if (!this.wizardPages) {
            return;
        }

        return this.wizardPages.find((item, idx) => {
            return idx === index;
        })
    }
}
