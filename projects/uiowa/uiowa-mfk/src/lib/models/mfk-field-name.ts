import { IMfk } from './mfk.interface';

export const MfkFieldName: { [k in keyof IMfk]: k } = {
  FUND: 'FUND',
  ORG: 'ORG',
  DEPT: 'DEPT',
  SUBDEPT: 'SUBDEPT',
  GRANTPGM: 'GRANTPGM',
  IACT: 'IACT',
  OACT: 'OACT',
  DACT: 'DACT',
  FN: 'FN',
  CCTR: 'CCTR',
  BRF: 'BRF'
};
