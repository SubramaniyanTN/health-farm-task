import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en from './translations/en.json' with { type: 'json' };
import tn from './translations/tn.json' with { type: 'json' };
import { NestedKeyOf } from './types';

export const languages = {
  en: { translation: en },
  tn: { translation: tn },
};

// Get device locale from expo-localization
const locales = Localization.getLocales();
const defaultLang = locales[0]?.languageCode === 'hi' ? 'hi' : 'en';
export type TranslationKeys = NestedKeyOf<typeof en>;
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: defaultLang,
  fallbackLng: 'en',
  resources: languages,
  interpolation: { escapeValue: false },
});

export const useCustomTranslation = () => {
  const { t } = useTranslation();
  return (key: TranslationKeys) => t(key);
};

export default i18n;
