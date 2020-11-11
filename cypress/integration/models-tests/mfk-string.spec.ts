import {
  MfkString,
  Mfk,
  areEqual,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

describe('Unit Test MfkString class', () => {
  before(() => {
    expect(MfkString, 'MfkString').to.be.a('function');
  });

  context('parse string to Mfk', () => {
    it('should correctly parse a valid Mfk string -- 1', () => {
      const s1 = new MfkString('02012101201001000000006219000001111235555');
      const m1: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6219',
        oact: '000',
        dact: '00111',
        fn: '12',
        cctr: '3555',
      } as Mfk;
      expect(s1.isValidMfk).to.be.true;
      expect(areEqual(s1.mfk, m1)).to.be.true;
    });

    it('should correctly parse a valid Mfk string -- 2', () => {
      const s1 = new MfkString('0201210120100100000000621900000111123555');
      const m1: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6219',
        oact: '000',
        dact: '00111',
        fn: '12',
        cctr: '3555',
      } as Mfk;
      expect(s1.isValidMfk).to.be.true;
      expect(areEqual(s1.mfk, m1)).to.be.true;
      expect(s1.mfk).to.deep.equal(m1);
    });

    it('should correctly parse an invalid Mfk string', () => {
      const s1 = new MfkString('020121012000100000000621900000111123555');
      expect(s1.isValidMfk).to.be.false;
      expect(s1.mfk).to.deep.equal({});
    });
  });
});
