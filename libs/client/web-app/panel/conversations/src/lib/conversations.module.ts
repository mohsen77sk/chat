import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '@chat/client/shared/util/transloco';

import { ConversationResolver } from './conversations.resolvers';
import { ConversationsComponent } from './conversations.component';
import { EmptyConversationComponent } from './empty-conversation/empty-conversation.component';
import { ConversationComponent } from './conversation/conversation.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmptyConversationComponent,
      },
      {
        path: ':id',
        component: ConversationComponent,
        resolve: {
          conversion: ConversationResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    TranslocoModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'conversations',
        loader: scopeLoader(
          (lang: string, root: string) => import(`./${root}/${lang}.json`)
        ),
      },
    },
  ],
  declarations: [
    ConversationsComponent,
    EmptyConversationComponent,
    ConversationComponent,
  ],
})
export class ConversationsModule {}
