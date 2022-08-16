// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** API base URL. */
  readonly VITE_APP_API_BASE_URL: string;

  /** API key. */
  readonly VITE_APP_API_KEY: string;
}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
