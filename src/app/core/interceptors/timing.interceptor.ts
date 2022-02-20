import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';

import {filter, map, Observable, tap} from 'rxjs';


@Injectable()
export class TsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let startTime!: number;
    let clonedRequest;



    if (req.method === 'POST' || (req.method === 'PUT')) {
      clonedRequest = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'user-token'
        })
      });
    } 
    if(req.method === 'GET') {
      startTime = Date.now();
      clonedRequest = req;
    }
    else {
      clonedRequest = req;
    }
    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      tap((event: HttpEvent<any>) => {
        const finishTime = Date.now();
        if(startTime) {
          const requestTime = finishTime - startTime;
          console.log(`Request time is ${requestTime}`);
        }
        return event
      })
    );

  }
}
