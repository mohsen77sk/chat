import { APP_INITIALIZER, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoModule,
  TranslocoService,
  TranslocoConfig,
} from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco.http-loader';
import { ChatConfigService } from '@chat/client/shared/util/config';
import { LocaleProvider } from './locale.provider';

import localeEn from '@angular/common/locales/en';
import localeFa from '@angular/common/locales/fa';
registerLocaleData(localeEn, 'en');
registerLocaleData(localeFa, 'fa');

export const availableLangs = [
  {
    id: 'en',
    label: 'English',
  },
  {
    id: 'fa',
    label: 'فارسی',
  },
];

@NgModule({
  providers: [
    {
      // Provide the default Transloco configuration
      provide: TRANSLOCO_CONFIG,
      deps: [ChatConfigService],
      useFactory: (chatConfigService: ChatConfigService): TranslocoConfig => ({
        availableLangs: availableLangs,
        defaultLang: chatConfigService.config.language,
        fallbackLang: chatConfigService.config.language,
        reRenderOnLangChange: true,
        prodMode: true,
      }),
    },
    {
      // Provide the default Transloco loader
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService],
      useFactory:
        (translocoService: TranslocoService): any =>
        (): Promise<Translation | undefined> => {
          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);
          return translocoService.load(defaultLang).toPromise();
        },
      multi: true,
    },
    LocaleProvider,
  ],
  exports: [TranslocoModule],
})
export class ChatTranslocoModule {}
