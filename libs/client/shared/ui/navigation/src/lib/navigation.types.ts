import { IsActiveMatchOptions, Params, QueryParamsHandling } from '@angular/router';

export interface ChatNavigationItem {
  id?: string;
  title?: string;
  subtitle?: string;
  type: 'aside' | 'basic' | 'collapsable' | 'divider' | 'group' | 'spacer';
  hidden?: (item: ChatNavigationItem) => boolean;
  active?: boolean;
  disabled?: boolean;
  tooltip?: string;
  link?: string;
  fragment?: string;
  preserveFragment?: boolean;
  queryParams?: Params | null;
  queryParamsHandling?: QueryParamsHandling | null;
  externalLink?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
  exactMatch?: boolean;
  isActiveMatchOptions?: IsActiveMatchOptions;
  function?: (item: ChatNavigationItem) => void;
  classes?: {
    title?: string;
    subtitle?: string;
    icon?: string;
    wrapper?: string;
  };
  icon?: string;
  badge?: {
    title?: string;
    classes?: string;
  };
  children?: ChatNavigationItem[];
  meta?: any;
}

export type ChatVerticalNavigationAppearance = 'default' | 'compact' | 'dense' | 'thin';

export type ChatVerticalNavigationMode = 'over' | 'side';

export type ChatVerticalNavigationPosition = 'start' | 'end';
