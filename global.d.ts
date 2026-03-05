declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

declare module 'talkr' {
  import { ReactNode } from 'react';

  interface TalkrProps {
    languages: Record<string, Record<string, string>>;
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
