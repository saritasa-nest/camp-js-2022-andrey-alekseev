// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMetaEnv {

  /** Api base url. */
  readonly VITE_APP_API_BASE_URL: string;

  /** Api key for schema. */
  readonly VITE_APP_SCHEMA_API_KEY: string;

  /** Api authorization header. */
  readonly VITE_APP_AUTHORIZATION_HEADER: string;
}

interface ImportMeta {

  /** Contains application environment data. */
  readonly env: ImportMetaEnv;
}
