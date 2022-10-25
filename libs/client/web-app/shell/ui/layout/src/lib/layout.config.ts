import { LayoutScreens, LayoutThemes } from '..';
import { LayoutDirection, LayoutScheme, LayoutTheme, LayoutType } from './chat-layout.types';

/**
 * LayoutConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface LayoutConfig {
  language: string;
  direction: LayoutDirection;
  screens: LayoutScreens;
  scheme: LayoutScheme;
  themes: LayoutThemes;
  theme: LayoutTheme;
  type: LayoutType;
}

/**
 * Default configuration for the entire application. This object is used by
 * ChatConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * ChatConfigService and its methods.
 */
export const layoutConfig: LayoutConfig = {
  language: 'en',
  direction: 'ltr',
  type: 'classic',
  scheme: 'light',
  screens: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  },
  theme: 'theme-default',
  themes: [
    {
      id: 'theme-default',
      name: 'Default',
    },
    {
      id: 'theme-teal',
      name: 'Teal',
    },
    {
      id: 'theme-purple',
      name: 'Purple',
    },
    {
      id: 'theme-amber',
      name: 'Amber',
    },
  ],
};
