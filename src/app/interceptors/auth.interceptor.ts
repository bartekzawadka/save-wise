import {Injectable, Injector} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.authService = this.injector.get(AuthService);

        req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getUser().token)});

        const userInfo = this.authService.getUser();

        return next.handle(req)
            .pipe(
                tap((ev: HttpEvent<any>)  => {
                    if (ev instanceof HttpResponse) {
                        const now = new Date();

                        if (userInfo.isAuthenticated() && userInfo.expires) {

                            const diff = ((userInfo.expires.getTime() - now.getTime()) / 1000);
                            if (diff <= 120) {
                                this.authService.refreshToken();
                            }
                        }
                    }
                }),
                catchError((error: any) => {
                    if (error.status === 401) {
                        this.authService.logOff();
                        //redirect
                        let router = this.injector.get(Router);
                        router.navigate(['/login']);
                    }

                    return throwError(error);
                })
            );
    }
}
