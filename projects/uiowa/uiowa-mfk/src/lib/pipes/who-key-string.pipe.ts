import { Pipe, PipeTransform } from '@angular/core';
import { Mfk } from '../models/mfk';

@Pipe({ name: 'whoKeyString' })
export class WhoKeyStringPipe implements PipeTransform {
  transform(value: Mfk, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    return (
      value.fund +
      '-' +
      value.org +
      '-' +
      value.dept +
      '-' +
      value.subdept +
      '-' +
      value.grantpgm +
      '-' +
      value.fn
    );
  }
}
