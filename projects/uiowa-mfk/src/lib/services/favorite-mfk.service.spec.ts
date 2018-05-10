import { TestBed, inject } from '@angular/core/testing';
import { FavoriteMfkService } from './favorite-mfk.service';
import { UiowaMfkConfig } from '../models/uiowa-mfk-config';
import { asyncData } from '../../test';
import { FavoriteMfk } from '../models/favorite-mfk';
import { Mfk } from '../models/mfk';

describe('FavoriteMfkService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let favoriteMfkService: FavoriteMfkService;
  const config: UiowaMfkConfig = {
    favoriteMfksApiUrl: 'api/myFavoriteMfks'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteMfkService]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    favoriteMfkService = new FavoriteMfkService(<any>httpClientSpy, config);
  });

  it('#trimLeadingAndTrailingSlash should generate correct API url', () => {
    const apiUrl = 'api/myFavoriteMfks';
    let result = (<any>favoriteMfkService).trimLeadingAndTrailingSlash(apiUrl);
    expect(result).toBe(apiUrl);

    result = (<any>favoriteMfkService).trimLeadingAndTrailingSlash(
      '/api/myFavoriteMfks'
    );
    expect(result).toBe(apiUrl);

    result = (<any>favoriteMfkService).trimLeadingAndTrailingSlash(
      'api/myFavoriteMfks/'
    );
    expect(result).toBe(apiUrl);

    result = (<any>favoriteMfkService).trimLeadingAndTrailingSlash(
      '/api/myFavoriteMfks/'
    );
    expect(result).toBe(apiUrl);
  });

  it('#getMyFavoriteMfks should return array of FavoriteMFKs', () => {
    const apiResponse = [
      {
        id: 12,
        alias: 'test MFK',
        mfk: {
          cctr: '1111',
          dact: '00000',
          dept: '1010',
          fn: '00',
          fund: '010',
          grantpgm: '00000000',
          iact: '6128',
          oact: '000',
          org: '11',
          subdept: '00000'
        }
      },
      {
        id: 125,
        alias: 'driving review',
        mfk: {
          cctr: '1231',
          dact: '00000',
          dept: '1010',
          fn: '00',
          fund: '010',
          grantpgm: '00000000',
          iact: '6128',
          oact: '000',
          org: '11',
          subdept: '00000'
        }
      }
    ];
    const expectedResult = [
      new FavoriteMfk(
        12,
        'test MFK',
        new Mfk('010-11-1010-00000-00000000-6128-000-00000-00-1111')
      ),
      new FavoriteMfk(
        125,
        'driving review',
        new Mfk('010-11-1010-00000-00000000-6128-000-00000-00-1231')
      )
    ];

    httpClientSpy.get.and.returnValue(asyncData(apiResponse));

    favoriteMfkService
      .getMyFavoriteMfks()
      .subscribe(x => expect(x).toEqual(expectedResult), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
