import { Mfk } from './mfk';

export class FavoriteMfk {
  /**
   * Favorite MFK
   * @param id:      The key for this favorite MFK in database. By default: 0.
   * @param alias:   The alias
   * @param mfk:     The Mfk object
   */
  constructor(
    public id: number = 0,
    public alias: string = '',
    public mfk: Mfk = null
  ) {}

  /**
   * cast an object to type of FavoriteMFK
   *
   * --> plain JSON object doesn't have type at run time.
   */
  static cast(obj: any): FavoriteMfk {
    const mfk = new FavoriteMfk();
    mfk.id += obj.id;
    mfk.alias = obj.alias;
    mfk.mfk = Mfk.cast(obj.mfk);
    return mfk;
  }

  /**
   * check if this Favorite MFK matches all 10 field values of a specified MFK.
   *
   * @param   mfk   an MFK
   * @returns boolean
   */
  matches(mfk: Mfk): boolean {
    return this.mfk.equals(mfk);
  }
}
