import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _conversationService: ConversationService) {}

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
  ): Observable<{ items: Conversation[] }> {
    return this._conversationService.getConversation();
  }
}
