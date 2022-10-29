import { NgModule } from '@angular/core';
import { ChatScrollbarDirective } from './scrollbar.directive';

@NgModule({
  declarations: [ChatScrollbarDirective],
  exports: [ChatScrollbarDirective],
})
export class ChatScrollbarModule {}
