import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {
  }

  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
          if (error.status === 401) {
            alert('Access Denied');
            this.router.navigateByUrl('/login');
            return throwError(error);
          }
          return throwError(error);
        }
      )
    );
  }
}
