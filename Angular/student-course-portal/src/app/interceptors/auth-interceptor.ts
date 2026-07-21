import { HttpInterceptorFn } from '@angular/common/http';

// Clones every outgoing request to add an Authorization header — the request/response
// objects in Angular's HttpClient are immutable, so headers must be added via .clone().
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: { Authorization: 'Bearer mock-token-12345' },
  });
  return next(cloned);
};
