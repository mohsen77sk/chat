import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { scopeLoader } from '@chat/client/shared/util/transloco';

import { ConversationResolver } from './conversations.resolvers';
import { ConversationsComponent } from './conversations.component';
import { EmptyConversationComponent } from './empty-conversation/empty-conversation.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ConversationInfoComponent } from './conversation-info/conversation-info.component';

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
    MatRippleModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSlideToggleModule,
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
    ConversationInfoComponent,
  ],
})
export class ConversationsModule {}
