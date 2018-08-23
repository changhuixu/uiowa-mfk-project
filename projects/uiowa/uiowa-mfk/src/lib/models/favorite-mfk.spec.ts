import { FavoriteMfk } from './favorite-mfk';
import { Mfk } from './mfk';

describe('FavoriteMfk', () => {
  it('should cast an object to FavoriteMfk class', () => {
    const obj = {
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
    };
    const result = FavoriteMfk.cast(obj);
    expect(result.id).toBe(obj.id);
    expect(result.alias).toBe(obj.alias);
    expect(result.mfk).toEqual(Mfk.cast(obj.mfk));
    expect(result instanceof FavoriteMfk).toBeTruthy();
    expect(result.mfk instanceof Mfk).toBeTruthy();

    const obj2 = {
      id: '12',
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
    };
    const result2 = FavoriteMfk.cast(obj);
    expect(result2.id).toBe(12);
  });

  it('should determine if an MFK matches a FavoriteMfk', () => {
    const obj = {
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
    };
    const result = FavoriteMfk.cast(obj);
    const expectedMfk = new Mfk(
      '010-11-1010-00000-00000000-6128-000-00000-00-1111'
    );
    expect(result.matches(expectedMfk)).toBeTruthy();
  });
});
