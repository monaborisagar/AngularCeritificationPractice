import { Component } from '@angular/core';
import { filter, map, of, from, catchError, Observable, concat as rxjsConcat, interval as rxjsInterval, merge, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-operator',
  templateUrl: './rxjs-operator.component.html',
  styleUrls: ['./rxjs-operator.component.scss']
})
export class RxjsOperatorComponent {
  /**
   * Demonstrates various RxJS operators with examples.
   *
   * - `of`: Emits the provided values as an observable sequence.
   * - `from`: Converts arrays, promises, or iterables into observable sequences.
   * - `Promise`: An object representing the eventual completion or failure of an asynchronous operation.
   * - Real-world example: Simulates fetching user data from an API using a Promise and converts it to an observable.
   * - `map`: Applies a transformation function to each emitted value.
   * - `filter`: Emits only values that satisfy a specified condition.
   * - `concat`: Sequentially combines multiple observables.
   * - `interval` and `take`: Emits sequential numbers at specified intervals, limited by `take`.
   * - `merge`: Merges emissions from multiple observables.
   * - `catchError`: Handles errors in an observable sequence and returns a fallback observable.
   *
   * Each operator is demonstrated with a simple example and console output.
   */
 
   RxjsOperatorCall(){
     const source = of(1,2,3,4,5);
     source.pipe( map(val => val * 10), filter(val => val > 3)).subscribe(val => console.log(val));

   }

   exampleOperators() {
    // of operator takes value  and emits them as an observable sequence
    const obsOf = of(10, 20, 30);
    obsOf.subscribe(val => console.log('of:', val));

    // from operatror takes an array, promise, or iterable and converts it into an observable sequence
    const obsFrom = from([100, 200, 300]);
    obsFrom.subscribe(val => console.log('from:', val));

    // from operator with a Promise example
    const promise = Promise.resolve('any data for promise');
    const obsFromPromise = from(promise);
    obsFromPromise.subscribe(val => console.log('from (Promise):', val));

    // Promise definition and example
    // A Promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    const simplePromise = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved!');
      reject('Promise rejected!');
      }, 500);
    });
    
    // Example: API call using fetch and Promise 
    //In web development, fetch refers to the fetch() API, a modern JavaScript method 
    // for making HTTP requests (such as GET, POST, etc.) to servers. It returns a Promise that 
    // resolves to the response of the request.
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => console.log('Fetch API data:', data))
      .catch(error => console.error('Fetch API error:', error));

    simplePromise.then(result => console.log('Promise example:', result));
    // Real-world example: Simulate fetching user data from an API using a Promise
    function fetchUserData(): Promise<{ id: number; name: string }> { // Simulated API call
      return new Promise((resolve, reject) => { //    Simulate an API call with a Promise
      setTimeout(() => {
        resolve({ id: 1, name: 'John Doe' });
      }, 1000); // Simulate network delay
      reject('Failed to fetch user data');
      });
    }

    const userDataObservable = from(fetchUserData());
    userDataObservable.subscribe({
      next: data => console.log('User data:', data),
      error: err => console.error('Error:', err),
      complete: () => console.log('User data fetch complete')
    });
    // map operator applies a given function to each value emitted by the source observable
    obsOf.pipe(map(x => x * 2)).subscribe(val => console.log('map:', val));

    // filter operator emits only those values that satisfy a specified condition
    obsOf.pipe(filter(x => x > 15)).subscribe(val => console.log('filter:', val));

    // concat operator combines multiple observables by sequentially emitting their values
    const obs1 = of('A', 'B');
    const obs2 = of('C', 'D');
    concat(obs1, obs2).subscribe(val => console.log('concat:', val));

    // interval and take operators create an observable that emits sequential numbers at specified intervals
    interval(500).pipe(take(3)).subscribe(val => console.log('interval/take:', val));

    // merge operator combines multiple observables by merging their emissions
    const obs3 = interval(1000).pipe(take(2)); // Emits 0, 1, 2, 3 at 1-second intervals
    const obs4 = interval(500).pipe(take(2)); // Emits 0, 1 at 0.5-second intervals 
     merge(obs3, obs4).subscribe(val => console.log('merge:', val));

    // catchError operator handles errors in an observable sequence
    of(1, 2, 3).pipe( //  Source observable
      map(x => { 
        if (x === 2) throw 'Error at 2'; // Simulate an error when x is 2
        return x;
      }),
      catchError(err => of('caught: ' + err)) // Return a new observable on error
    ).subscribe(val => console.log('catchError:', val)); // Output: 1, 'caught: Error at 2
  }
}

/**
 * Example: concat operator
 * 
 * The concat operator combines multiple observables by emitting all values from the first observable,
 * then all values from the second, and so on, in sequence.
 * 
 * In the example above:
 *   const obs1 = of('A', 'B');
 *   const obs2 = of('C', 'D');
 *   concat(obs1, obs2).subscribe(val => console.log('concat:', val));
 * 
 * Output:
 *   concat: A
 *   concat: B
 *   concat: C
 *   concat: D
 * 
 * This demonstrates that concat waits for obs1 to complete before starting obs2.
 */

function concat(obs1: Observable<string>, obs2: Observable<string>) { // Concatenates two observables
  return rxjsConcat(obs1, obs2);
}

// Implementation using RxJS interval
function interval(period: number) {
  return rxjsInterval(period);
}

/**
 * Example: interval operator
 * 
 * The interval operator creates an observable that emits sequential numbers (starting from 0)
 * at specified time intervals.
 * 
 * Usage:
 *   interval(1000).pipe(take(3)).subscribe(val => console.log('interval:', val));
 * 
 * Output (every 1 second):
 *   interval: 0
 *   interval: 1
 *   interval: 2
 * 
 * The take operator is often used with interval to limit the number of emissions.
 */
