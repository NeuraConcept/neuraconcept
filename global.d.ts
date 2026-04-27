declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

declare module 'talkr' {
  import { ReactNode } from 'react';

  type TranslationDict = { [key: string]: string | TranslationDict };

  interface TalkrProps {
    languages: Record<string, TranslationDict>;
    defaultLanguage: string;
    children: ReactNode;
  }

  export function Talkr(props: TalkrProps): JSX.Element;

  export function useT(): {
    T: (key: string, params?: Record<string, string | number>) => string;
    setLocale: (locale: string) => void;
    locale: string;
  };
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
