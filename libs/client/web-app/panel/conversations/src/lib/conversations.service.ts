import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@chat/client/shared/app-config';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Conversations } from './conversations.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  private _conversations: BehaviorSubject<Conversations[] | null> =
    new BehaviorSubject<Conversations[] | null>(null);

  /**
   * Constructor
   */
  constructor(
    @Inject(APP_CONFIG) private _appConfig: IAppConfig,
    private _httpClient: HttpClient
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for conversion
   */
  get conversations$(): Observable<Conversations[] | null> {
    return this._conversations.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get conversion
   *
   * @param search
   */
  getConversations(
    search: string = ''
  ): Observable<{ items: Conversations[] }> {
    const params = new HttpParams();
    if (search) params.append('search', search);

    return this._httpClient
      .get<{ conversations: Conversations[] }>(
        `${this._appConfig.apiEndpoint}/conversation`,
        { params }
      )
      .pipe(
        map((response) => ({
          items: response.conversations,
        })),
        tap((response) => {
          this._conversations.next(response.items);
          // this._conversations.next([]);
        })
      );
  }
}
