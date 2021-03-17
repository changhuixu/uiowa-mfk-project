import { Component, OnInit } from '@angular/core';
import {
  areEqual,
  emptyMfk,
  Mfk,
} from 'projects/uiowa/uiowa-mfk/src/public-api';

interface Account {
  id: number;
  mfk: Mfk;
  percentage: number;
}

@Component({
  selector: 'app-split-cost',
  templateUrl: './split-cost.component.html',
  styleUrls: ['./split-cost.component.css'],
})
export class SplitCostComponent implements OnInit {
  accounts: Account[] = [];
  total = 0;
  id = 0;
  constructor() {}

  ngOnInit(): void {
    this.accounts.push({
      id: this.id,
      mfk: emptyMfk(),
      percentage: 100,
    });
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.accounts
      .map((x) => Number(x.percentage))
      .reduce((a, c) => a + c);
  }

  addMfk() {
    this.id++;
    this.accounts.push({
      id: this.id,
      mfk: emptyMfk(),
      percentage: 0,
    });
    this.updateTotal();
  }

  removeMfk(id: number) {
    if(this.accounts.length === 1){
      return;
    }
    this.accounts = this.accounts.filter((x) => x.id != id);
    this.updateTotal();
  }
}
