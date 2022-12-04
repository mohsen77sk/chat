import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConversationsService } from './conversations.service';
import { Conversations } from './conversations.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _conversationsService: ConversationsService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ items: Conversations[] }> {
    return this._conversationsService.getConversations();
  }
}
