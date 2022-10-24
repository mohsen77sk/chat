import { NgModule } from '@angular/core';

import { ChatSplashScreenService } from './splash-screen.service';

@NgModule({
  providers: [ChatSplashScreenService],
})
export class ChatSplashScreenModule {
  /**
   * Constructor
   */
  constructor(private _chatSplashScreenService: ChatSplashScreenService) {}
}
