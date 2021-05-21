import { Mfk } from './mfk';

export class MfkFieldName {
  static FUND = 'fund' as keyof Mfk;
  static ORG = 'org' as keyof Mfk;
  static DEPT = 'dept' as keyof Mfk;
  static SUBDEPT = 'subdept' as keyof Mfk;
  static GRANTPGM = 'grantpgm' as keyof Mfk;
  static IACT = 'iact' as keyof Mfk;
  static OACT = 'oact' as keyof Mfk;
  static DACT = 'dact' as keyof Mfk;
  static FN = 'fn' as keyof Mfk;
  static CCTR = 'cctr' as keyof Mfk;
  static BRF = 'brf' as keyof Mfk;
}
