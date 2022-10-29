import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { chatShellRoutes } from './chat-shell.routes';

import { AuthCoreModule } from '@chat/client/web-app/shell/core/auth';
import { UserCoreModule } from '@chat/client/web-app/shell/core/user';
import { NavigationCoreModule } from '@chat/client/web-app/shell/core/navigation';

import { ChatLayoutModule, layoutConfig } from '@chat/client/web-app/shell/ui/layout';

import { ChatIconModule } from '@chat/client/shared/util/icon';
import { ChatConfigModule } from '@chat/client/shared/util/config';
import { ChatTranslocoModule } from '@chat/client/shared/util/transloco';
import { ChatMediaWatcherModule } from '@chat/client/shared/util/media-watcher';
import { ChatSplashScreenModule } from '@chat/client/shared/util/splash-screen';
import { ChatPlatformModule } from '@chat/client/shared/util/platform';
import { ChatUtilsModule } from '@chat/client/shared/util/utils';

const routerConfig: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  preloadingStrategy: PreloadAllModules,
};

@NgModule({
  imports: [
    // Utils
    ChatIconModule,
    ChatConfigModule.forRoot(layoutConfig),
    ChatTranslocoModule,
    ChatMediaWatcherModule,
    ChatSplashScreenModule,
    ChatPlatformModule,
    ChatUtilsModule,

    // Layout module of your application
    ChatLayoutModule,

    // Core module of your application
    AuthCoreModule,
    UserCoreModule,
    NavigationCoreModule,

    RouterModule.forRoot(chatShellRoutes, routerConfig),
  ],
  providers: [
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        doctype: true,
        theme: false,
        version: true,
      },
    },
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
  ],
  exports: [RouterModule],
})
export class ChatWebShellModule {}
