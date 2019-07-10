import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {AuthService} from "./services/auth.service";
import {NgAutonumericModule} from "@angularfy/ng-autonumeric";
import { CostPositionInputComponent } from './common/controls/cost-position-input/cost-position-input.component';
import {BudgetSetupPage} from "./pages/budget-setup/budget-setup.page";
import {WizardModule} from "./common/wizard/wizard.module";
import {BudgetPeriodComponent} from "./budget/setup/components/budget-period/budget-period.component";
import {IncomeCategoriesComponent} from "./budget/setup/components/income-categories/income-categories.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        IonicModule.forRoot({
            mode: 'ios'
        }),
        AppRoutingModule,
        HttpClientModule,
        NgAutonumericModule,
        WizardModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
