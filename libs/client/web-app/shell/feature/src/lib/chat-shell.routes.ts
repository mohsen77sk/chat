import { Route } from '@angular/router';

import { AuthGuard } from '@chat/client/web-app/shell/core/auth';
import { NoAuthGuard } from '@chat/client/web-app/shell/core/auth';
import { ChatLayoutComponent } from '@chat/client/web-app/shell/ui/layout';

import { InitialDataResolver } from './chat-shell.resolvers';

export const chatShellRoutes: Route[] = [
  // Redirect empty path to '/panel'
  { path: '', pathMatch: 'full', redirectTo: 'panel' },

  // Redirect signed in user to the '/panel'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-in-redirect',
    pathMatch: 'full',
    redirectTo: 'panel',
  },

  // Auth routes for guests
  {
    path: '',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: ChatLayoutComponent,
    data: {
      layoutType: 'empty',
    },
    children: [],
  },

  // Auth routes for authenticated users
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: ChatLayoutComponent,
    data: {
      layoutType: 'empty',
    },
    children: [],
  },

  // Panel routes
  {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: ChatLayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // panel
      {
        path: 'panel',
        children: [],
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
