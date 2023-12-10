import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@chat/client/shared/app-config';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '@chat/client/web-app/shell/core/auth';

@Injectable({ providedIn: 'root' })
export class ChatSocket extends Socket {
  constructor(
    @Inject(APP_CONFIG) private _appConfig: IAppConfig,
    private _authService: AuthService,
  ) {
    super({
      url: _appConfig.apiEndpoint,
      options: {
        transports: ['websocket'],
        auth: {
          authorization: _authService.accessToken,
        },
      },
    });
  }
}
