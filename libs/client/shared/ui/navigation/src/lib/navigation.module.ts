import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatScrollbarModule } from '@chat/client/shared/ui/scrollbar';

import { ChatHorizontalNavigationComponent } from './horizontal/horizontal.component';
import { ChatHorizontalNavigationBasicItemComponent } from './horizontal/components/basic/basic.component';
import { ChatHorizontalNavigationBranchItemComponent } from './horizontal/components/branch/branch.component';
import { ChatHorizontalNavigationDividerItemComponent } from './horizontal/components/divider/divider.component';
import { ChatHorizontalNavigationSpacerItemComponent } from './horizontal/components/spacer/spacer.component';
import { ChatVerticalNavigationComponent } from './vertical/vertical.component';
import { ChatVerticalNavigationAsideItemComponent } from './vertical/components/aside/aside.component';
import { ChatVerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { ChatVerticalNavigationCollapsableItemComponent } from './vertical/components/collapsable/collapsable.component';
import { ChatVerticalNavigationDividerItemComponent } from './vertical/components/divider/divider.component';
import { ChatVerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';
import { ChatVerticalNavigationSpacerItemComponent } from './vertical/components/spacer/spacer.component';

@NgModule({
  declarations: [
    ChatHorizontalNavigationComponent,
    ChatHorizontalNavigationBasicItemComponent,
    ChatHorizontalNavigationBranchItemComponent,
    ChatHorizontalNavigationDividerItemComponent,
    ChatHorizontalNavigationSpacerItemComponent,
    ChatVerticalNavigationComponent,
    ChatVerticalNavigationAsideItemComponent,
    ChatVerticalNavigationBasicItemComponent,
    ChatVerticalNavigationCollapsableItemComponent,
    ChatVerticalNavigationDividerItemComponent,
    ChatVerticalNavigationGroupItemComponent,
    ChatVerticalNavigationSpacerItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    ChatScrollbarModule,
  ],
  exports: [ChatHorizontalNavigationComponent, ChatVerticalNavigationComponent],
})
export class ChatNavigationModule {}
