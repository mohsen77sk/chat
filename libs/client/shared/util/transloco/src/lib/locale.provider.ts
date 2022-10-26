import { LOCALE_ID, Provider } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

export class LocaleId extends String {
  constructor(private _translocoService: TranslocoService) {
    super();
  }

  override toString(): string {
    return this._translocoService.getActiveLang();
  }

  override valueOf(): string {
    return this.toString();
  }
}

export const LocaleProvider: Provider = [
  {
    provide: LOCALE_ID,
    deps: [TranslocoService],
    useClass: LocaleId,
  },
];
