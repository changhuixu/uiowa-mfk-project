import { Component, linkedSignal, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  areEqual,
  emptyMfk,
  Mfk,
  MfkInput,
  MfkString,
  stringify,
} from '../../../projects/uiowa/uiowa-mfk/src/public-api';
import { FavoriteMfk, FavoriteMfkService } from './favorite-mfk.service';

@Component({
  selector: 'app-favorite-mfk-demo',
  imports: [MfkInput, MfkString, FormsModule],
  templateUrl: './favorite-mfk-demo.html',
  styleUrl: './favorite-mfk-demo.css',
})
export class FavoriteMfkDemo implements OnInit {
  favoriteMfks = signal<FavoriteMfk[]>([]);
  mfk = signal<Mfk>(emptyMfk());
  inFavorite = linkedSignal(() => this.favoriteMfks().some((x) => areEqual(this.mfk(), x.mfk)));
  showDropdown = false;
  constructor(private readonly svc: FavoriteMfkService) {}

  ngOnInit() {
    this.svc.getMyFavoriteMfks().subscribe((x) => this.favoriteMfks.set(x));
  }

  onFavoriteIconClick(): void {
    if (!this.mfk) {
      throw new Error('Please enter or select an MFK.');
    }
    if (stringify(this.mfk()).length < 40) {
      return;
    }
    if (this.inFavorite()) {
      const id = this.favoriteMfks().find((x) => areEqual(this.mfk(), x.mfk))?.id ?? 0;
      if (confirm('Are you sure to remove this MFK?')) {
        this.svc.deleteMyFavoriteMfk(id).subscribe((x) => {
          this.favoriteMfks.set(x);
        });
      } else {
        return;
      }
    } else {
      const alias = prompt('Please enter an alias for this MFK:', '');
      if (!alias) {
        return;
      } else {
        if (alias.length > 50) {
          throw new Error('The alias should be shorter than 50 characters.');
        }
        this.svc.addFavoriteMfk(alias, this.mfk()).subscribe((x) => {
          this.favoriteMfks.set(x);
        });
      }
    }
  }

  selectMfk(selectedMfk: FavoriteMfk) {
    this.mfk.set(selectedMfk.mfk);
    this.showDropdown = false;
  }

  clear() {
    this.mfk.set(emptyMfk());
    this.showDropdown = false;
  }
}
