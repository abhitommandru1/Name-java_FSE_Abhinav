import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Setting the BehaviorSubject to true here executes synchronously inside whatever
  // triggered the request (e.g. a component's ngOnInit) — if that happens to be in the
  // same change-detection pass Angular is currently running for the parent (App)
  // component, the async-piped spinner value changes AFTER the parent was already
  // checked, which is exactly what NG0100 (ExpressionChangedAfterItHasBeenChecked)
  // flags. Deferring the "start" transition by a microtask moves it to its own CD pass;
  // the "stop" transition in finalize() is already async (it runs when the HTTP
  // response arrives) so it doesn't need the same treatment.
  queueMicrotask(() => loadingService.setLoading(true));

  return next(req).pipe(finalize(() => loadingService.setLoading(false)));
};
