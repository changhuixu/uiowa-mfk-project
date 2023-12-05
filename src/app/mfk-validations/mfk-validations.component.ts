import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  emptyMfk,
  Mfk,
  MfkString,
  stringify,
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
  templateUrl: './mfk-validations.component.html',
  styleUrls: ['./mfk-validations.component.css'],
})
export class MfkValidationsComponent implements OnInit {
  mfk1: Mfk = emptyMfk();
  mfkStructureErrors: string[] = [];
  validationResult: MfkValidationResult = {
    statusCode: 0,
    statusMessage: '',
    descriptions: { fundDesc: '', orgDesc: '', deptDesc: '' },
  } as MfkValidationResult;

  constructor(private readonly httpClient: HttpClient) {}

  ngOnInit(): void {}

  updateMfk1() {
    const s = new MfkString('2604350644010000000000602652020100000000');
    this.mfk1 = s.mfk;
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
      this.validationResult = {
        statusCode: +parts[0],
        statusMessage: parts[1].trim(),
        descriptions: this.parseMfkComponents(parts[2]),
      } as MfkValidationResult;
    });
  }

  private parseMfkComponents(s: string) {
    var components = s.split(',');
    return {
      fundDesc: components
        .filter((c) => c.trim().startsWith('FUND='))[0]
        .split('=')[1],
      orgDesc: components
        .filter((c) => c.trim().startsWith('ORG='))[0]
        .split('=')[1],
      deptDesc: components
        .filter((c) => c.trim().startsWith('DEPT='))[0]
        .split('=')[1],
      iactDesc: components
        .filter((c) => c.trim().startsWith('IACT='))[0]
        .split('=')[1],
    };
  }
}
