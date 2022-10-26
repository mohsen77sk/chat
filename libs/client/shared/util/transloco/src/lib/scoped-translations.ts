import { availableLangs } from './transloco.module';

export const scopeLoader = (importer: any, root = 'i18n') => {
  return availableLangs.reduce((acc: any, lang) => {
    acc[lang.id] = () => importer(lang.id, root);
    return acc;
  }, {});
};
