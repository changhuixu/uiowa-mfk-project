import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  emptyMfk,
  Mfk,
  MfkInput,
  stringify,
  validFormat,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';

interface Account {
  id: number;
  mfk: Mfk;
  percentage: number | null;
}

@Component({
  selector: 'app-split-cost',
  imports: [MfkInput, JsonPipe, FormsModule],
  templateUrl: './split-cost.html',
  styleUrl: './split-cost.css',
})
export class SplitCost {
  accounts = signal<Account[]>([
    {
      id: 0,
      mfk: emptyMfk(),
      percentage: 100,
    },
  ]);
  total = computed(() =>
    this.accounts()
      .map((x) => Number(x.percentage))
      .reduce((a, c) => a + c, 0)
  );
  id = 0;
  errorMsgs: string[] = [];
  private modalRef: NgbModalRef | null = null;
  busy = false;

  constructor(private modalService: NgbModal) {}

  addMfk() {
    this.id++;
    this.accounts.update((accounts) => [
      ...accounts,
      {
        id: this.id,
        mfk: this.accounts()[0].mfk,
        percentage: null,
      },
    ]);
  }

  removeMfk(id: number) {
    if (this.accounts.length === 1) {
      return;
    }
    this.accounts.set(this.accounts().filter((x) => x.id != id));
  }

  open(content: any) {
    this.errorMsgs = [];
    const mfks = this.accounts().map((a) => stringify(a.mfk));
    if (new Set(mfks).size !== mfks.length) {
      this.errorMsgs.push('There are duplicate MFKs.');
    }
    if (this.total() !== 100) {
      this.errorMsgs.push('The total percentage should be 100.');
    }
    if (this.accounts().some((a) => !validFormat(a.mfk))) {
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
  }

  save() {
    this.busy = true;
    console.log(this.accounts);
    this.busy = false;
    this.modalRef?.close();
  }
}
