import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatAlertModule } from '@chat/client/shared/ui/alert';

import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '@chat/client/shared/util/transloco';

import { SignUpComponent } from './sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ChatAlertModule,
    TranslocoModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'signUp',
        loader: scopeLoader(
          (lang: string, root: string) => import(`./${root}/${lang}.json`),
        ),
      },
    },
  ],
  declarations: [SignUpComponent],
})
export class AuthSignUpModule {}
