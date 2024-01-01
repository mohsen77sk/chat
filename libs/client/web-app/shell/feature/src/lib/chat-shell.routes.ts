import { Route } from '@angular/router';

import { AuthGuard } from '@chat/client/web-app/shell/core/auth';
import { NoAuthGuard } from '@chat/client/web-app/shell/core/auth';
import { ChatLayoutComponent } from '@chat/client/web-app/shell/ui/layout';

import { InitialDataResolver } from './chat-shell.resolvers';

export const chatShellRoutes: Route[] = [
  // Redirect empty path to '/panel'
  { path: '', pathMatch: 'full', redirectTo: 'panel/conversations' },

  // Redirect signed in user to the '/panel'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'panel/conversations',
  },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: ChatLayoutComponent,
    data: {
      layoutType: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('@chat/client/web-app/auth/sign-in').then(
            (m) => m.AuthSignInModule,
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('@chat/client/web-app/auth/sign-up').then(
            (m) => m.AuthSignUpModule,
          ),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ChatLayoutComponent,
    data: {
      layoutType: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('@chat/client/web-app/auth/sign-out').then(
            (m) => m.AuthSignOutModule,
          ),
      },
    ],
  },

  // Panel routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ChatLayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // panel
      {
        path: 'panel',
        children: [
          {
            path: 'conversations',
            loadChildren: () =>
              import('@chat/client/web-app/panel/conversations').then(
                (m) => m.ConversationsModule,
              ),
          },
        ],
      },
    ],
  },

  // Error routes & Catch all
  {
    path: '',
    component: ChatLayoutComponent,
    data: {
      layoutType: 'empty',
    },
    children: [],
  },
];
