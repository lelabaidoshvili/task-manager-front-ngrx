import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
} from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';
import { AuthFacadeService } from 'src/app/pages/auth/auth-facade.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isTokenRefreshRequestInProgress = false;
  tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  static addTokenToRequest(
    request: HttpRequest<any>,
    token: string | null
  ): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return request;
  }

  constructor(private authFacadeService: AuthFacadeService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authFacadeService.token) {
      req = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authFacadeService.token}`
        ),
      });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 401:
            return this.handleError401(req, next);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }

  handleError401(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<any> {
    // token is not refreshing currently
    if (!this.isTokenRefreshRequestInProgress) {
      this.isTokenRefreshRequestInProgress = true;
      this.tokenSubject.next(null);

      return this.authFacadeService
        .refreshToken(this.authFacadeService.RefreshTok)
        .pipe(
          switchMap((res: AuthResponse) => {
            if (res) {
              this.tokenSubject.next(res.token.accessToken);
              return next.handle(
                AuthInterceptor.addTokenToRequest(
                  request,
                  res.token.accessToken
                )
              );
            } else {
              this.authFacadeService.signOut();
              return of(false);
            }
          }),
          catchError((err) => {
            this.authFacadeService.signOut();
            return of(false);
          }),
          finalize(() => {
            this.isTokenRefreshRequestInProgress = false;
          })
        );
    } else {
      return this.tokenSubject.pipe(
        filter((accessToken) => accessToken != null),
        take(1),
        switchMap((accessToken) => {
          return next.handle(
            AuthInterceptor.addTokenToRequest(request, accessToken)
          );
        }),
        catchError((err: HttpErrorResponse) => {
          this.authFacadeService.signOut();
          return of(false);
        })
      );
    }
  }
}
