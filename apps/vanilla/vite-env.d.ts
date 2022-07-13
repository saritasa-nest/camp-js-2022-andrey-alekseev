// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** API base URL. */
  readonly VITE_APP_API_BASE_URL: string;

  /** API key for schema. */
  readonly VITE_APP_SCHEMA_API_KEY: string;

  /** API authorization header. */
  readonly VITE_APP_AUTHORIZATION_HEADER: string;
}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
