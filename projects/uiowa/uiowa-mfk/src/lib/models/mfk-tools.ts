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

/**
 * checks if each field of an Mfk object is in a valid format
 * returns an array of error messages
 * If the format is valid, then the returning array is empty.
 */
export function validateStructure(mfk: Mfk): string[] {
  const result: string[] = [];
  if (mfk.fund?.length !== 3) {
    result.push(`Invalid Fund: Length is incorrect (must be 3 digits)`);
  }
  if (mfk.org?.length !== 2) {
    result.push(`Invalid Org: Length is incorrect (must be 2 digits)`);
  }
  if (mfk.dept?.length !== 4) {
    result.push(`Invalid Dept: Length is incorrect (must be 4 digits)`);
  }
  if (mfk.subdept?.length !== 5) {
    result.push(`Invalid Subdept: Length is incorrect (must be 5 digits)`);
  }
  if (mfk.grantpgm?.length !== 8) {
    result.push(`Invalid Grant/Pgm: Length is incorrect (must be 8 digits)`);
  }
  if (mfk.iact?.length !== 4) {
    result.push(`Invalid Iact: Length is incorrect (must be 4 digits)`);
  }
  if (mfk.oact?.length !== 3) {
    result.push(`Invalid Oact: Length is incorrect (must be 3 digits)`);
  }
  if (mfk.dact?.length !== 5) {
    result.push(`Invalid Dact: Length is incorrect (must be 5 digits)`);
  }
  if (mfk.fn?.length !== 2) {
    result.push(`Invalid Fn: Length is incorrect (must be 2 digits)`);
  }
  if (mfk.cctr?.length !== 4) {
    result.push(`Invalid Cctr: Length is incorrect (must be 4 digits)`);
  }
  if (mfk.brf && mfk.brf.length !== 2) {
    result.push(`Invalid Brf: Length is incorrect (must be 2 digits)`);
  }
  return result;
}
