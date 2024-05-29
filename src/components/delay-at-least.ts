import { combineLatest, Observable, OperatorFunction, timer } from 'rxjs';
import { map } from 'rxjs/operators';

export function delayAtLeast<T>(delay: number): OperatorFunction<T, T> {
  return function (source$: Observable<T>): Observable<T> {
    return combineLatest([timer(delay), source$]).pipe(map(x => x[1]));
  };
}
