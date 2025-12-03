import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import {
  emptyMfk,
  Mfk,
  MfkInput,
  MfkString,
  stringify,
  toMfk,
  validateStructure,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

interface MfkValidationResult {
  statusCode: number;
  statusMessage: string;
  descriptions: {
    fundDesc: string;
    orgDesc: string;
    deptDesc: string;
  };
}

@Component({
  selector: 'app-mfk-validations',
  imports: [MfkInput, MfkString, JsonPipe],
  templateUrl: './mfk-validations.html',
  styleUrl: './mfk-validations.css',
})
export class MfkValidations {
  mfk1: Mfk = emptyMfk();
  mfkStructureErrors: string[] = [];
  validationResult = signal<MfkValidationResult>({
    statusCode: 0,
    statusMessage: '',
    descriptions: { fundDesc: '', orgDesc: '', deptDesc: '' },
  });

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {}

  updateMfk1() {
    this.mfk1 = toMfk('2604350644010000000000602652020100000000');
  }

  validateMfk1() {
    this.mfkStructureErrors = validateStructure(this.mfk1);
    if (this.mfkStructureErrors.length) {
      return;
    }
    const mfk40String = stringify(this.mfk1).replace(/-/g, '');
    const url = `https://apps.its.uiowa.edu/mfk/api-singleDesc.jsp?mfk=10%20%20%20${mfk40String}`;
    return this.httpClient.get(url, { responseType: 'text' }).subscribe((x) => {
      const parts = x.split(/\n/);
      this.validationResult.set({
        statusCode: +parts[0],
        statusMessage: parts[1].trim(),
        descriptions: this.parseMfkComponents(parts[2]),
      });
    });
  }

  private parseMfkComponents(s: string) {
    var components = s.split(',');
    return {
      fundDesc: components.filter((c) => c.trim().startsWith('FUND='))[0].split('=')[1],
      orgDesc: components.filter((c) => c.trim().startsWith('ORG='))[0].split('=')[1],
      deptDesc: components.filter((c) => c.trim().startsWith('DEPT='))[0].split('=')[1],
      iactDesc: components.filter((c) => c.trim().startsWith('IACT='))[0].split('=')[1],
    };
  }
}
