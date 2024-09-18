import { HttpInterceptorFn } from '@angular/common/http';

export const baseurlInterceptor: HttpInterceptorFn = (req, next) => {
  var NewReq = req.clone({ url: 'http://localhost:5206' + req.url })
  return next(NewReq);
};
