import { FavoriteMfk } from './favorite-mfk';
import { MfkFieldOption } from './mfk-field-option';
import { IMfk } from './mfk.interface';

/**
 * Uiowa MFK Type
 *
 * class type contains 10 required MFK fields and 1 optional BFR field.
 * there are also several common methods ready to use.
 */
export class Mfk implements IMfk {
  FUND = '';
  ORG = '';
  DEPT = '';
  SUBDEPT = '';
  GRANTPGM = '';
  IACT = '';
  OACT = '';
  DACT = '';
  FN = '';
  CCTR = '';
  BRF = '';

  /**
   * Uiowa MFK. constructor takes a MFK string.
   *
   * Non-numeric characters will be stripped out automatically.
   *
   * Example usages:
   * ```typescript
   * let m1 = new Mfk();
   * const m2 = new Mfk('010-11-1010-00000-00000000-6218-000-00000-00-1111');
   * const m3 = new Mfk('0201210120100100000000621900000111123555');
   * ```
   */
  constructor(mfkString: string = null) {
    if (mfkString) {
      this.parseString(mfkString);
    }
  }

  /**
   * cast an object to type of MFK
   *
   * --> plain JSON object doesn't have type at run time.
   */
  static cast(obj: any): Mfk {
    const mfk = new Mfk();
    Object.keys(obj).forEach(key => (mfk[key.toUpperCase()] = obj[key]));
    return mfk;
  }

  /**
   * Compare values of all 10 fields
   *
   * @param mfk An MFK
   */
  equals(mfk: Mfk): boolean {
    return (
      this.FUND === mfk.FUND &&
      this.ORG === mfk.ORG &&
      this.DEPT === mfk.DEPT &&
      this.SUBDEPT === mfk.SUBDEPT &&
      this.GRANTPGM === mfk.GRANTPGM &&
      this.IACT === mfk.IACT &&
      this.DACT === mfk.DACT &&
      this.OACT === mfk.OACT &&
      this.FN === mfk.FN &&
      this.CCTR === mfk.CCTR
    );
  }

  /**
   * convert MFK to a 40 digit string.
   * @param   separator   (Optional) the separator between MFK parts. Default: "".
   * @returns MFK string
   */
  to40String(separator: string = ''): string {
    return Object.keys(this)
      .filter((k: keyof IMfk) => k !== 'BRF')
      .map(k => this[k])
      .join(separator);
  }

  /**
   * Get MFK format validation message. It checkes this MFK's first 10 fields are numeric strings or not.
   */
  validateFormat(): string {
    const mfkString = this.to40String();
    if (mfkString.length !== 40) {
      return `MFK is not 40 digits long.`;
    }
    if (isNaN(Number(mfkString))) {
      return `MFK [${mfkString}] should be all numbers.`;
    }
    return null;
  }

  /**
   * check if this MFK is in an array of Favorite MFKs.
   *
   * @param   favoriteMfks   an array of Favorite MFKs.
   * @returns boolean
   */
  isIn(favoriteMfks: FavoriteMfk[]): boolean {
    if (!favoriteMfks || favoriteMfks.length < 1) {
      return false;
    }
    return favoriteMfks.some(x => x.matches(this));
  }

  /**
   * MFK module internal method.
   */
  parseString(input: string) {
    const s = input.replace(/\D/g, '');
    if (!s || s.length < 40) {
      return;
    }
    this.FUND = s.substring(0, 3);
    this.ORG = s.substring(3, 5);
    this.DEPT = s.substring(5, 9);
    this.SUBDEPT = s.substring(9, 14);
    this.GRANTPGM = s.substring(14, 22);
    this.IACT = s.substring(22, 26);
    this.OACT = s.substring(26, 29);
    this.DACT = s.substring(29, 34);
    this.FN = s.substring(34, 36);
    this.CCTR = s.substring(36, 40);
    if (s.length >= 42) {
      this.BRF = s.substring(40, 42);
    }
  }
}
