import { NgModule } from '@angular/core';
import { ChatPlatformService } from './platform.service';

@NgModule({
  providers: [ChatPlatformService],
})
export class ChatPlatformModule {
  /**
   * Constructor
   */
  constructor(private _chatPlatformService: ChatPlatformService) {}
}
