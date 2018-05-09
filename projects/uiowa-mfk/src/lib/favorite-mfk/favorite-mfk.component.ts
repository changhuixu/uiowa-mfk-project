import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Mfk } from '../models/mfk';
import { FavoriteMfk } from '../models/favorite-mfk';
import { MfkFieldOption } from '../models/mfk-field-option';
import { FavoriteMfkService } from '../services/favorite-mfk.service';
import { UiowaMfkOptionsService } from '../services/uiowa-mfk-options.service';

@Component({
  selector: 'uiowa-favorite-mfk',
  templateUrl: './favorite-mfk.component.html',
  styleUrls: ['./favorite-mfk.component.css']
})
export class FavoriteMfkComponent implements OnInit, OnChanges {
  @Input() favoriteMfks: FavoriteMfk[];
  @Input() mfk: Mfk;
  @Input() options?: MfkFieldOption[] = [];
  @Output() mfkChanges = new EventEmitter<Mfk>();
  @Output() favoriteMfksUpdated = new EventEmitter<FavoriteMfk[]>();

  favoriteIconTitle: string;
  favoriteIconClass: string;
  constructor(
    private readonly favoriteMfksService: FavoriteMfkService,
    private readonly optionsService: UiowaMfkOptionsService
  ) {}

  ngOnInit() {
    this.options = this.optionsService.getOptions(this.options);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.favoriteMfks) {
      this.favoriteMfks = changes.favoriteMfks.currentValue;
      if (this.favoriteMfks && this.favoriteMfks.length > 1)
        this.favoriteMfks = this.favoriteMfks.sort((a, b) => {
          return a.alias > b.alias ? 1 : b.alias > a.alias ? -1 : 0;
        });
    }
    if (changes.mfk) {
      this.mfk = changes.mfk.currentValue;
    }
    this.favoriteIconClass = this.getFavoriteIconClass();
    if (changes.options) {
      this.options = changes.options.currentValue;
      this.options = this.optionsService.getOptions(this.options);
    }
  }

  onInputMfkChange(inputMfk: Mfk) {
    this.mfk = inputMfk;
    this.favoriteIconClass = this.getFavoriteIconClass();
  }

  onFavoriteIconClick(): void {
    if (!this.mfk) {
      throw new Error('Please enter or select an MFK.');
    }
    const mfkFormatError = this.mfk.validateFormat();
    if (mfkFormatError) {
      throw new Error(mfkFormatError);
    }
    if (this.mfk.isIn(this.favoriteMfks)) {
      const id = this.favoriteMfks.find(x => x.matches(this.mfk)).id;
      if (confirm('Are you sure to remove this MFK?')) {
        this.favoriteMfksService.deleteMyFavoriteMfk(id).subscribe(x => {
          this.favoriteMfks = x;
          this.favoriteIconClass = this.getFavoriteIconClass();
          this.favoriteMfksUpdated.emit(this.favoriteMfks);
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
        this.favoriteMfksService
          .addFavoriteMfk(alias, this.mfk)
          .subscribe(x => {
            this.favoriteMfks = x;
            this.favoriteIconClass = this.getFavoriteIconClass();
            this.favoriteMfksUpdated.emit(this.favoriteMfks);
          });
      }
    }
  }

  onSelect(selectedMfk: FavoriteMfk = null) {
    if (!selectedMfk) {
      this.mfk = new Mfk();
      for (let option of this.options.filter(o => o.defaultValue)) {
        this.mfk[option.name] = option.defaultValue;
      }
    } else {
      Object.assign(this.mfk, selectedMfk.mfk);
    }
    this.favoriteIconClass = this.getFavoriteIconClass();
  }

  private getFavoriteIconClass(): string {
    if (this.mfk && this.mfk.isIn(this.favoriteMfks)) {
      this.favoriteIconTitle = 'Remove this MFK';
      return 'fa-star active';
    }
    this.favoriteIconTitle = 'Add to favorite MFKs';
    return 'fa-star-o inactive';
  }
}
