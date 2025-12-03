import { Pipe, PipeTransform } from '@angular/core';
import { Mfk } from '../models/mfk';
import { stringify } from '../models/mfk-tools';

@Pipe({ name: 'mfkString' })
export class MfkStringPipe implements PipeTransform {
  transform(value: Mfk, ...args: unknown[]): string {
    return stringify(value);
  }
}
