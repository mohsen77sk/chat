import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '@chat/client/shared/app-config';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Conversation } from './conversation.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  private _conversation: BehaviorSubject<Conversation[] | null> =
    new BehaviorSubject<Conversation[] | null>(null);

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
  get conversation$(): Observable<Conversation[] | null> {
    return this._conversation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get conversion
   *
   * @param search
   */
  getConversation(search: string = ''): Observable<{ items: Conversation[] }> {
    const params = new HttpParams();
    if (search) params.append('search', search);

    return this._httpClient
      .get<{ data: Conversation[] }>(
        `${this._appConfig.apiEndpoint}/conversation`,
        { params }
      )
      .pipe(
        map((response) => ({
          items: response.data,
        })),
        tap((response) => {
          this._conversation.next(response.items);
        })
      );
  }
}
