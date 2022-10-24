import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { CHAT_APP_CONFIG } from './config.constants';

@Injectable({
  providedIn: 'root',
})
export class ChatConfigService {
  private _config!: BehaviorSubject<any>;

  /**
   * Constructor
   */
  constructor(@Inject(CHAT_APP_CONFIG) config: any) {
    // Private
    this._config = new BehaviorSubject(this._getFromStorage() ?? config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for config
   */
  set config(value: any) {
    // Merge the new config over to the current config
    const config = merge({}, this._config.getValue(), value);

    // Execute the observable
    this._setToStorage(config);
    this._config.next(config);
  }

  get config(): any {
    return this._config.value;
  }

  get config$(): Observable<any> {
    return this._config.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resets the config to the default
   */
  reset(): void {
    // Set the config
    this._setToStorage(this.config);
    this._config.next(this.config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set config to storage
   *
   * @param config
   * @private
   */
  private _setToStorage(config: object): void {
    localStorage.setItem('configToken', btoa(JSON.stringify(config)));
  }

  /**
   * Get config from storage
   *
   * @private
   */
  private _getFromStorage(): object | null {
    const data = localStorage.getItem('configToken');
    try {
      return JSON.parse(atob(data ?? ''));
    } catch {
      return null;
    }
  }
}
