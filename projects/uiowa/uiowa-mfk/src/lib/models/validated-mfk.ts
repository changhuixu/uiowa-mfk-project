import { Mfk } from './mfk';

export interface ValidatedMfk {
  mfk: Mfk;
  statusCode: number;
  statusMessage: string;
  valid: boolean;
}
