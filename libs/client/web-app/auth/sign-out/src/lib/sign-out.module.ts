import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '@chat/client/shared/util/transloco';

import { SignOutComponent } from './sign-out.component';

const routes: Routes = [
  {
    path: '',
    component: SignOutComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'signOut',
        loader: scopeLoader((lang: string, root: string) => import(`./${root}/${lang}.json`)),
      },
    },
  ],
  declarations: [SignOutComponent],
})
export class AuthSignOutModule {}
