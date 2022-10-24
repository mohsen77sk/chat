import { ModuleWithProviders, NgModule } from '@angular/core';
import { ChatConfigService } from './config.service';
import { CHAT_APP_CONFIG } from './config.constants';

@NgModule()
export class ChatConfigModule {
  /**
   * Constructor
   */
  constructor(private _chatConfigService: ChatConfigService) {}

  /**
   * forRoot method for setting user configuration
   *
   * @param config
   */
  static forRoot(config: any): ModuleWithProviders<ChatConfigModule> {
    return {
      ngModule: ChatConfigModule,
      providers: [
        {
          provide: CHAT_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
