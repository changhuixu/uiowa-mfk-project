import { Mfk } from './mfk';
import { MfkFieldName } from './mfk-field-name';

export class MfkString {
  /**
   * MFK parsed from a string. Default value is an empty object.
   */
  mfk: Mfk = {} as Mfk;

  isValidMfk: boolean = false;

  /**
   * construct an MFK String and build an MFK object. Default MFK object is an empty object.
   * @param mfkString string. The constructor will strip out non-digit characters. The string length must be longer than 40.
   */
  constructor(public mfkString: string) {
    const s = mfkString.replace(/\D/g, '');
    if (!s || s.length < 40) {
      return;
    }
    this.mfk.fund = s.substring(0, 3);
    this.mfk.org = s.substring(3, 5);
    this.mfk.dept = s.substring(5, 9);
    this.mfk.subdept = s.substring(9, 14);
    this.mfk.grantpgm = s.substring(14, 22);
    this.mfk.iact = s.substring(22, 26);
    this.mfk.oact = s.substring(26, 29);
    this.mfk.dact = s.substring(29, 34);
    this.mfk.fn = s.substring(34, 36);
    this.mfk.cctr = s.substring(36, 40);
    if (s.length >= 42) {
      this.mfk.brf = s.substring(40, 42);
    }
    this.isValidMfk = true;
  }
}
