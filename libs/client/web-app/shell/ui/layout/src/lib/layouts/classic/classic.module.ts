import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatNavigationModule } from '@chat/client/shared/ui/navigation';
import { ChatMediaWatcherModule } from '@chat/client/shared/util/media-watcher';

import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '@chat/client/shared/util/transloco';

import { ClassicLayoutComponent } from './classic.component';

@NgModule({
  declarations: [ClassicLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    //
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    //
    ChatNavigationModule,
    ChatMediaWatcherModule,
    TranslocoModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'layout',
        loader: scopeLoader((lang: string, root: string) => import(`../../${root}/${lang}.json`)),
      },
    },
  ],
  exports: [ClassicLayoutComponent],
})
export class ClassicLayoutModule {}
