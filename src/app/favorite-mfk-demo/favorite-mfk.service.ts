import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mfk, toMfk } from '../../../projects/uiowa/uiowa-mfk/src/public-api';

export interface FavoriteMfk {
  id: number;
  alias: string;
  mfk: Mfk;
}

@Injectable({ providedIn: 'root' })
export class FavoriteMfkService {
  private readonly favoriteMfks = [
    {
      id: 1,
      alias: 'Test',
      mfk: toMfk('02012101201001000000006219000001111235555'),
    } as FavoriteMfk,
  ];
  constructor() {}

  getMyFavoriteMfks(): Observable<FavoriteMfk[]> {
    return of(this.favoriteMfks);
  }

  addFavoriteMfk(alias: string, mfk: Mfk): Observable<FavoriteMfk[]> {
    const ids = this.favoriteMfks.map((x) => x.id);
    const nextId = Math.max(...ids) + 1;
    this.favoriteMfks.push({ id: nextId, alias, mfk });
    return of([...this.favoriteMfks]);
  }

  deleteMyFavoriteMfk(id: number): Observable<FavoriteMfk[]> {
    const index = this.favoriteMfks.findIndex((x) => x.id === id);
    this.favoriteMfks.splice(index, 1);
    return of([...this.favoriteMfks]);
  }
}
