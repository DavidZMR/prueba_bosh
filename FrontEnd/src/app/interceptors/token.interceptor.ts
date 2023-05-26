import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {Response} from '../models/Response'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}
  get token() {
    return sessionStorage.getItem('token');
  }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${this.token}`)
    });
    return next.handle(newRequest).pipe(
      tap((httpEvent: HttpEvent<any>) =>{
        if (httpEvent instanceof HttpResponse) {
            const response = httpEvent.body as Response<any>
            if( response.token ){
              sessionStorage.setItem('token', response.token)
              
            }
        }
    })
    )
  }
}
