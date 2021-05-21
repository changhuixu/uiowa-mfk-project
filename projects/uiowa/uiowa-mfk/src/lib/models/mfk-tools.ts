import { Mfk } from './mfk';
import { MfkFieldName } from './mfk-field-name';

/**
 * checks the equality of two Mfk objects
 * @param mfk1 an Mfk object
 * @param mfk2 an Mfk object
 */
export function areEqual(mfk1: Mfk, mfk2: Mfk): boolean {
  if (!mfk1 || !mfk2) {
    return false;
  }
  if (Object.keys(mfk1).length !== Object.keys(mfk2).length) {
    return false;
  }
  for (const k of Object.keys(mfk1)) {
    if (mfk1[k as keyof Mfk] !== mfk2[k as keyof Mfk]) {
      return false;
    }
  }
  return true;
}

/**
 * converts an Mfk object to a string by joining 10 fields with '-' symbol.
 * @param mfk An Mfk object
 */
export function stringify(mfk: Mfk | null): string {
  if (!mfk) {
    return '';
  }
  const s = Object.keys(mfk)
    .filter((k) => k !== MfkFieldName.BRF)
    .map((k) => mfk[k as keyof Mfk])
    .join('-');
  return s;
}

/**
 * creates an empty Mfk object with all 10 fields being empty string
 */
export function emptyMfk(): Mfk {
  return {
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
  };
}

/**
 * checks if an Mfk object is in a valid format
 */
export function validFormat(mfk: Mfk): boolean {
  var mfkString = stringify(mfk);
  if (mfkString.length !== 49) {
    return false;
  }
  if (mfk.brf && mfk.brf.length !== 2) {
    return false;
  }
  return true;
}
