import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from './wizard/wizard.component';
import {WizardPageComponent} from './wizard-page/wizard-page.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
    declarations: [WizardComponent, WizardPageComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [WizardComponent, WizardPageComponent]
})
export class WizardModule {
}
