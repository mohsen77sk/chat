import { Injectable } from '@angular/core';
import { ChatSocket } from 'libs/client/web-app/shell/core/socket/src';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ConversationInfo,
  ConversationsPaginate,
  Message,
  MessagesPaginate,
  UsersPaginate,
} from './conversations.types';

@Injectable({
  providedIn: 'root',
})
export class ConversationsService {
  private _currentConversation: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);

  /**
   * Constructor
   */
  constructor(private socket: ChatSocket) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current conversation
   */
  get currentConversation$(): Observable<number | null> {
    return this._currentConversation.asObservable();
  }

  /**
   * Setter for current conversation
   */
  set currentConversation(value: number | null) {
    this._currentConversation.next(value);
    if (value) this.joinConversation(value);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get my conversions
   */
  getMyConversations(): Observable<ConversationsPaginate> {
    return this.socket.fromEvent<ConversationsPaginate>('conversations');
  }

  /**
   * Emit paginate conversations
   *
   * @param take
   * @param page
   */
  emitPaginateConversations(take: number, page: number): void {
    this.socket.emit('paginateConversations', { take, page });
  }

  /**
   * Join conversation
   *
   * @param conversationId
   */
  joinConversation(conversationId: number) {
    this.socket.emit('joinConversation', conversationId);
  }

  /**
   * Leave conversation
   *
   * @param conversationId
   */
  LeaveConversation(conversationId: number) {
    this.socket.emit('leaveConversation', conversationId);
  }

  /**
   * Get conversation info
   */
  getConversationInfo(): Observable<ConversationInfo> {
    return this.socket.fromEvent<ConversationInfo>('conversationInfo');
  }

  /**
   * Get conversation users
   */
  getConversationUsers(): Observable<UsersPaginate> {
    return this.socket.fromEvent<UsersPaginate>('conversationUsers');
  }

  /**
   * Emit paginate users
   *
   * @param conversationId
   * @param take
   * @param page
   */
  emitPaginateConversationUsers(
    conversationId: number,
    take: number,
    page: number,
  ): void {
    this.socket.emit('paginateUsers', {
      conversationId,
      pageOptionsDto: { take, page },
    });
  }

  /**
   * Get my messages
   */
  getConversationMessages(): Observable<MessagesPaginate> {
    return this.socket.fromEvent<MessagesPaginate>('conversationMessages');
  }

  /**
   * Emit paginate messages
   *
   * @param conversationId
   * @param take
   * @param page
   */
  emitPaginateConversationMessages(
    conversationId: number,
    take: number,
    page: number,
  ): void {
    this.socket.emit('paginateMessages', {
      conversationId,
      pageOptionsDto: { take, page },
    });
  }

  /**
   *  Send message
   *
   * @param conversationId
   * @param text
   */
  sendMessage(conversationId: number, text: string) {
    this.socket.emit('addMessage', { conversationId, text });
  }

  /**
   * Get added messages
   */
  getAddedMessages(): Observable<Message> {
    return this.socket.fromEvent<Message>('addMessage');
  }
}
