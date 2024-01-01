import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from './auth.utils';

import { UserService } from '@chat/client/web-app/shell/core/user';
import { APP_CONFIG, IAppConfig } from '@chat/client/shared/app-config';
import { registerModel } from './auth.types';

@Injectable()
export class AuthService {
  private _authenticated = false;

  /**
   * Constructor
   */
  constructor(
    @Inject(APP_CONFIG) private _appConfig: IAppConfig,
    private _httpClient: HttpClient,
    private _userService: UserService,
  ) {}

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
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }

    return this._httpClient
      .post(`${this._appConfig.apiEndpoint}/auth/login`, credentials)
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.accessToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;

          // Return a new observable with the response
          return of(response);
        }),
      );
  }

  /**
   * Sign up
   *
   * @param registerModel
   */
  signUp(registerModel: registerModel): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError(() => 'User is already logged in.');
    }

    return this._httpClient
      .post(`${this._appConfig.apiEndpoint}/user/register`, registerModel)
      .pipe(
        switchMap((response: any) => {
          // Store the access token in the local storage
          this.accessToken = response.accessToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          this._userService.user = response.user;

          // Return a new observable with the response
          return of(response);
        }),
      );
  }
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
        of(false),
      ),
    );
  }
}
