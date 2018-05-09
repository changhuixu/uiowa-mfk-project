import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FavoriteMfk } from '../models/favorite-mfk';
import { Mfk } from '../models/mfk';
import { ConfigToken, UiowaMfkConfig } from '../models/uiowa-mfk-config';

@Injectable()
export class FavoriteMfkService {
  private readonly apiUrl: string;
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(ConfigToken) private readonly config: UiowaMfkConfig
  ) {
    this.apiUrl = this.config.favoriteMfksApiUrl;
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
