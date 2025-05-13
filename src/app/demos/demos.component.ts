import { Component, OnInit } from '@angular/core';
import {
  Mfk,
  MfkFieldName,
  MfkFieldOption,
  emptyMfk,
  toMfk,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

@Component({
  selector: 'app-demos',
  standalone: false,
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css'],
})
export class DemosComponent implements OnInit {
  mfk1: Mfk = emptyMfk();
  mfk2: Mfk = emptyMfk();
  options2 = [new MfkFieldOption(MfkFieldName.IACT, 'xxxx', true)];
  mfk3: Mfk = { iact: '6128' } as Mfk;
  options3 = [new MfkFieldOption(MfkFieldName.IACT, '6128')];
  mfk4: Mfk = emptyMfk();
  mfk5 = toMfk('2604350644010000000000602652020100000000');
  mfk6 = toMfk('5104350644010000000000602652020100000000');
  outputCount = 0;

  constructor() {}
  ngOnInit(): void {}

  log(mfk: Mfk) {
    this.outputCount++;
    console.log(mfk);
  }
}
