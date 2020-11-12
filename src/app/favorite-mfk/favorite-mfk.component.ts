import { Component, OnInit } from '@angular/core';
import {
  areEqual,
  emptyMfk,
  Mfk,
  MfkFieldOption,
  stringify,
} from 'projects/uiowa/uiowa-mfk/src/public-api';
import { FavoriteMfk } from './models/favorite-mfk';
import { FavoriteMfkService } from './services/favorite-mfk.service';

@Component({
  selector: 'app-favorite-mfk',
  templateUrl: './favorite-mfk.component.html',
  styleUrls: ['./favorite-mfk.component.css'],
})
export class FavoriteMfkComponent implements OnInit {
  favoriteMfks: FavoriteMfk[];
  mfk: Mfk = emptyMfk();
  options?: MfkFieldOption[] = [];

  favoriteIconTitle: string;
  isIconActive = false;
  constructor(private readonly svc: FavoriteMfkService) {}

  ngOnInit() {
    this.svc.getMyFavoriteMfks().subscribe((x) => (this.favoriteMfks = x));
  }

  onMfkInputChange(inputMfk: Mfk) {
    this.mfk = inputMfk;
    this.isIconActive = this.isInFavorites();
  }

  onFavoriteIconClick(): void {
    if (!this.mfk) {
      throw new Error('Please enter or select an MFK.');
    }
    if (stringify(this.mfk).length < 40) {
      return;
    }
    if (this.isInFavorites()) {
      const id = this.favoriteMfks.find((x) => areEqual(this.mfk, x.mfk)).id;
      if (confirm('Are you sure to remove this MFK?')) {
        this.svc.deleteMyFavoriteMfk(id).subscribe((x) => {
          this.favoriteMfks = x;
          this.isIconActive = this.isInFavorites();
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
        this.svc.addFavoriteMfk(alias, this.mfk).subscribe((x) => {
          this.favoriteMfks = x;
          this.isIconActive = this.isInFavorites();
        });
      }
    }
  }

  onSelect(selectedMfk: FavoriteMfk = null) {
    if (!selectedMfk) {
      // clear MFK
      this.mfk = emptyMfk();
      this.options
        .filter((o) => o.defaultValue)
        .forEach((o) => (this.mfk[o.name] = o.defaultValue));
    } else {
      this.mfk = selectedMfk.mfk;
    }
    this.isIconActive = this.isInFavorites();
  }

  private isInFavorites(): boolean {
    return this.mfk && this.favoriteMfks.some((x) => areEqual(this.mfk, x.mfk));
  }
}
