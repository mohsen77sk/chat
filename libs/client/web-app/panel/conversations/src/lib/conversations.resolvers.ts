import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { ConversationsService } from './conversations.service';

@Injectable({
  providedIn: 'root',
})
export class ConversationResolver implements Resolve<any> {
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    // Get conversation id
    const id = Number.parseInt(route.paramMap.get('id') ?? '0');
    // Set current conversation
    this._conversationsService.currentConversation = id > 0 ? id : null;
  }
}
