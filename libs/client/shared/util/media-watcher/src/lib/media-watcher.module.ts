import { NgModule } from '@angular/core';
import { ChatMediaWatcherService } from './media-watcher.service';

@NgModule({
  providers: [ChatMediaWatcherService],
})
export class ChatMediaWatcherModule {
  /**
   * Constructor
   */
  constructor(private _chatMediaWatcherService: ChatMediaWatcherService) {}
}
