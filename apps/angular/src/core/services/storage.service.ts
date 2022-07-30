import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Storage service. */
@Injectable({
  providedIn: 'root',
})
export class StorageService {

  /**
   * Set item to local storage.
   * @param key Key.
   * @param data Data for save.
   */
  public set<T>(key: string, data: T): Observable<void> {
    return new Observable<void>(subscriber => {
      localStorage.setItem(key, JSON.stringify(data));
      subscriber.next();
    });
  }

  /**
   * Get value by key.
   * @param key Key.
   */
  public get<T = unknown>(key: string): Observable<T | null> {
    return new Observable(subscriber => {
      const rawData = localStorage.getItem(key);
      if (rawData === null) {
        return subscriber.next(null);
      }
      subscriber.next(JSON.parse(rawData) as T);
    });
  }

  /**
   * Remove data from storage by key.
   * @param key Key.
   */
  public remove(key: string): Observable<void> {
    return new Observable<void>(subscriber => {
      localStorage.removeItem(key);
      subscriber.next();
    });
  }
}
