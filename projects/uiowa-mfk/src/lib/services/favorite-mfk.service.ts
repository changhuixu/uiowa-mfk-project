import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FavoriteMfk } from '../models/favorite-mfk';
import { Mfk } from '../models/mfk';

@Injectable()
export class FavoriteMfkService {
  public apiUrl: string;
  constructor(
    private readonly httpClient: HttpClient,
    @Inject('config') private readonly config: string
  ) {
    if (this.config.startsWith('http')) this.apiUrl = this.config;
  }

  getMyFavoriteMfks(): Observable<FavoriteMfk[]> {
    return this.httpClient
      .get<FavoriteMfk[]>(this.apiUrl)
      .pipe(map(mfks => mfks.map(m => FavoriteMfk.cast(m))));
  }

  addFavoriteMfk(alias: string, mfk: Mfk): Observable<FavoriteMfk[]> {
    const request = { Alias: alias, Mfk: mfk };
    return this.httpClient
      .post<FavoriteMfk[]>(this.apiUrl, request)
      .pipe(map(mfks => mfks.map(m => FavoriteMfk.cast(m))));
  }

  deleteMyFavoriteMfk(id: number): Observable<FavoriteMfk[]> {
    return this.httpClient
      .delete<FavoriteMfk[]>(`${this.apiUrl}/${id}`)
      .pipe(map(mfks => mfks.map(m => FavoriteMfk.cast(m))));
  }

  private trimLeadingAndTrailingSlash(s: string): string {
    if (s.charAt(0) == '/') s = s.substr(1);
    if (s.charAt(s.length - 1) == '/') s = s.substr(0, s.length - 1);
    return s;
  }
}
