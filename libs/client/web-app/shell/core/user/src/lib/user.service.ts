import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, map, tap } from 'rxjs';
import { User } from './user.types';
import { APP_CONFIG, IAppConfig } from '@chat/client/shared/app-config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * Constructor
   */
  constructor(@Inject(APP_CONFIG) private _appConfig: IAppConfig, private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get the current logged in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>(`${this._appConfig.apiEndpoint}/user`).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>(`${this._appConfig.apiEndpoint}/user`, { user }).pipe(
      map((response) => {
        this._user.next(response);
      })
    );
  }
}
