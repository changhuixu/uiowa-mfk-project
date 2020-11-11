import {
  Mfk,
  areEqual,
  stringify,
  emptyMfk,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

describe('Unit Test MfkTools functions', () => {
  before(() => {
    expect(areEqual, 'areEqual').to.be.a('function');
    expect(stringify, 'stringify').to.be.a('function');
    expect(emptyMfk, 'emptyMfk').to.be.a('function');
  });

  context('Mfk areEqual function tests', () => {
    it('should return true for two empty Mfk objects', () => {
      const m1: Mfk = {} as Mfk;
      const m2: Mfk = {} as Mfk;
      expect(areEqual(m1, m2)).to.be.true;
    });

    it('should return true for same Mfk object', () => {
      const m1: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6219',
      } as Mfk;
      expect(areEqual(m1, m1)).to.be.true;
    });

    it('should return true for two equal Mfk objects -- 1', () => {
      const m1: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6219',
      } as Mfk;
      const m2: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6219',
      } as Mfk;
      expect(areEqual(m1, m2)).to.be.true;
    });

    it('should return true for two equal Mfk objects -- 2', () => {
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
      const m2: Mfk = {
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
      expect(areEqual(m1, m2)).to.be.true;
    });

    it('should return false for two not-equal Mfk objects -- 1', () => {
      const m1: Mfk = {} as Mfk;
      const m2: Mfk = {
        fund: '020',
        org: '12',
      } as Mfk;
      expect(areEqual(m1, m2)).to.be.false;
    });

    it('should return false for two not-equal Mfk objects -- 2', () => {
      const m1: Mfk = { iact: '6219' } as Mfk;
      const m2: Mfk = {
        fund: '020',
        org: '12',
      } as Mfk;
      expect(areEqual(m1, m2)).to.be.false;
    });

    it('should return false for two not-equal Mfk objects -- 3', () => {
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
      const m2: Mfk = {
        fund: '020',
        org: '12',
        dept: '1012',
        subdept: '01001',
        grantpgm: '00000000',
        iact: '6218',
        oact: '000',
        dact: '00111',
        fn: '12',
        cctr: '3555',
      } as Mfk;
      expect(areEqual(m1, m2)).to.be.false;
    });
  });

  context('Mfk stringify function tests', () => {
    it('should return empty string for an empty Mfk object', () => {
      const m: Mfk = {} as Mfk;
      expect(stringify(m)).to.equal('');
    });

    it('should return correct string for a partial Mfk object -- 1', () => {
      const m: Mfk = {
        fund: '020',
        org: '12',
      } as Mfk;
      expect(stringify(m)).to.equal('020-12');
    });

    it('should return correct string for a partial Mfk object -- 2', () => {
      const m: Mfk = {
        iact: '6218',
      } as Mfk;
      expect(stringify(m)).to.equal('6218');
    });

    it('should return correct string for an Mfk object', () => {
      const m: Mfk = {
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
      expect(stringify(m)).to.equal(
        '020-12-1012-01001-00000000-6219-000-00111-12-3555'
      );
    });
  });

  context('emptyMfk function tests', () => {
    it('should create an empty Mfk object', () => {
      const m1: Mfk = {
        fund: '',
        org: '',
        dept: '',
        subdept: '',
        grantpgm: '',
        iact: '',
        oact: '',
        dact: '',
        fn: '',
        cctr: '',
      } as Mfk;
      const m2 = emptyMfk();
      expect(m1).to.not.equal(m2);
      expect(m1).to.deep.equal(m2);
    });

    it('should create an identical empty Mfk object', () => {
      const m1 = emptyMfk();
      const m2 = emptyMfk();
      expect(m1).to.not.equal(m2);
      expect(m1).to.deep.equal(m2);
    });
  });
});
