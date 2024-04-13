// Declaration file of all translations.
// Translations are located in /locales/{language}/{namespace}.ts

// Import namespaces for each language.
import commonEn from '../../locales/en/common';
import commonSl from '../../locales/sl/common';

const resources = {
  // Define namespaces for each language.
  en: {
    common: commonEn,
  },
  sl: {
    common: commonSl,
  },
} as const;

export default resources;
