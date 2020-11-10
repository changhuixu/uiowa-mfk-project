import { Mfk } from './mfk';

export class EmptyMfk {
  static create(): Mfk {
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
}
