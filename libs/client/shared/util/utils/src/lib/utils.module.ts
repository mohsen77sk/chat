import { NgModule } from '@angular/core';
import { ChatUtilsService } from './utils.service';

@NgModule({
  providers: [ChatUtilsService],
})
export class ChatUtilsModule {
  /**
   * Constructor
   */
  constructor(private _chatUtilsService: ChatUtilsService) {}
}
