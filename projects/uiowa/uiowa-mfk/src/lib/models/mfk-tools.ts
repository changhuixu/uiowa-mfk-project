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
    if (mfk1[k] !== mfk2[k]) {
      return false;
    }
  }
  return true;
}

/**
 * converts an Mfk object to a string by joining 10 fields with '-' symbol.
 * @param mfk An Mfk object
 */
export function stringify(mfk: Mfk): string {
  const s = Object.keys(mfk)
    .filter((k) => k !== MfkFieldName.BRF)
    .map((k) => mfk[k])
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
