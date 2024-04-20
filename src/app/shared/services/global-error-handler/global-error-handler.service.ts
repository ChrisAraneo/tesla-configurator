import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { Error } from './error.type';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly _error = new BehaviorSubject<Error | null>(null);

  constructor() {}

  get error(): Observable<Error | null> {
    return this._error.asObservable().pipe(debounceTime(50));
  }

  handleError(error: Error): void {
    console.error(error?.message);
    this._error.next(error);
  }
}
