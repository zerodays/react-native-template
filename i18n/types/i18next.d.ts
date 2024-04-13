import 'i18next';
import resources from '../resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      [key in keyof typeof resources.en]: (typeof resources.en)[key];
    };
  }
}
