import { Mfk } from './mfk';

describe('Mfk', () => {
  it('should construct MFK by string', () => {
    let mfk = new Mfk('010-11-1010-00000-00000000-6218-000-00000-00-1111');
    expect(mfk.FUND).toBe('010');
    expect(mfk.DEPT).toBe('1010');
    expect(mfk.CCTR).toBe('1111');
    expect(mfk.OACT).toBe('000');
    expect(mfk.IACT).toBe('6218');

    mfk = new Mfk('0201210120100100000000621900000111123555');
    expect(mfk.ORG).toBe('12');
    expect(mfk.SUBDEPT).toBe('01001');
    expect(mfk.CCTR).toBe('3555');
    expect(mfk.FN).toBe('12');
    expect(mfk.DACT).toBe('00111');
    expect(mfk.IACT).toBe('6219');
  });

  it('should output 40 digits string', () => {
    const str1 = '010-11-1010-00000-00000000-6218-000-00000-00-1111';
    const str2 = '0101110100000000000000621800000000001111';
    let mfk = new Mfk(str1);
    expect(mfk.to40String()).toBe(str2);
    mfk = new Mfk(str2);
    expect(mfk.to40String('-')).toBe(str1);
    mfk = new Mfk();
    expect(mfk.to40String('-')).toBe('---------');
  });

  it('should validate format', () => {
    let mfk = new Mfk('010-11-1010-00000-00000000-6218-000-00000-00-1111');
    let errorMsg = mfk.validateFormat();
    expect(errorMsg).toBeNull();
    mfk = Mfk.cast({
      cctr: '1111',
      dact: '00000',
      dept: '1010',
      fn: '00',
      fund: '010',
      grantpgm: '00000000',
      iact: '6128',
      oact: '000',
      org: '11',
      subdept: '000x0'
    });
    errorMsg = mfk.validateFormat();
    expect(errorMsg).toBe(
      'MFK [010111010000x000000000612800000000001111] should be all numbers.'
    );
    mfk = new Mfk('010-11-1010-00000-00000000-6218-000-00000-00-111');
    errorMsg = mfk.validateFormat();
    expect(errorMsg).toBe('MFK is not 40 digits long.');
  });
});
