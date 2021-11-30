import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface GameData {
  question: string;
  all_words: string[];
  good_words: string[];
}

@Injectable()
export class DataService {
  private readonly dataUrl = `${location.origin}${location.pathname}assets/data.json`;
  private data = new BehaviorSubject<GameData[]>([]);

  constructor(private readonly httpClient: HttpClient) {}

  getGameData(): Observable<GameData[]> {
    if (this.data.value.length) {
      return this.data.asObservable();
    }
    return this.httpClient.get<GameData[]>(this.dataUrl).pipe(
      tap(d => this.data.next(d))
    );
  }
}
