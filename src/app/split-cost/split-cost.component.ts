import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from '@uiowa/uiowa-mfk';
import {
  areEqual,
  emptyMfk,
  Mfk,
  validFormat,
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
  errorMsgs: string[] = [];
  private modalRef: NgbModalRef;
  busy = false;

  constructor(private modalService: NgbModal) {}

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
      mfk: this.accounts[0].mfk,
      percentage: null,
    });
    this.updateTotal();
  }

  removeMfk(id: number) {
    if (this.accounts.length === 1) {
      return;
    }
    this.accounts = this.accounts.filter((x) => x.id != id);
    this.updateTotal();
  }

  open(content: any) {
    this.errorMsgs = [];
    const mfks = this.accounts.map((a) => stringify(a.mfk));
    if (new Set(mfks).size !== mfks.length) {
      this.errorMsgs.push('There are duplicate MFKs.');
    }
    if (this.total !== 100) {
      this.errorMsgs.push('The total percentage should be 100.');
    }
    if (this.accounts.some((a) => !validFormat(a.mfk))) {
      this.errorMsgs.push('Please verify MFK format.');
    }
    if (this.errorMsgs.length) {
      return;
    }

    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      size: 'lg',
      backdrop: 'static',
    });
    this.modalRef.result.then(
      (_) => {},
      (_) => {}
    );
  }

  save() {
    this.busy = true;
    console.log(this.accounts);
    this.busy = false;
    this.modalRef.close();
  }
}
