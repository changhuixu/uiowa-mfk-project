import { Component, OnInit } from '@angular/core';
import {
  MfkFieldOption,
  MfkFieldName,
  Mfk,
  emptyMfk,
} from 'projects/uiowa/uiowa-mfk/src/public-api';

@Component({
  selector: 'app-demos',
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

  constructor() {}
  ngOnInit(): void {}
}
