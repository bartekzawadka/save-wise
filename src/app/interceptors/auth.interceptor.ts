import {Injectable, Injector} from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);

        req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.authService.getUser().token
            }
        });

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.authService.logOff();
                    }

                    return throwError(error);
                })
            );
    }
}
