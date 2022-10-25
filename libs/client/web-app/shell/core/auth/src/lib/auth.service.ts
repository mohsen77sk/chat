import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthUtils } from './auth.utils';

import { UserService } from '@chat/client/web-app/shell/core/user';

@Injectable()
export class AuthService {
  private _authenticated = false;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private _userService: UserService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, check access token
    return this._userService.get().pipe(
      switchMap(() => {
        // Set the authenticated flag to true
        this._authenticated = true;

        // Return true
        return of(true);
      }),
      catchError(() =>
        // Return false
        of(false)
      )
    );
  }
}
