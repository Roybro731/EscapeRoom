import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req, next) {
      const token = localStorage.getItem('token');
      const authRequest = req.clone({
          headers: req.headers.set('Authorization', token),
      });
      return next.handle(authRequest);
  }

}
