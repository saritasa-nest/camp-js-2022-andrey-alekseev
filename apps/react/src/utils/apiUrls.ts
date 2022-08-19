
interface AuthUrls {

  /** Login url. */
  readonly login: string;

  /** Register url. */
  readonly register: string;

  /** Token refresh url. */
  readonly tokenRefresh: string;
}

interface AnimeUrls {

  /** Base url. */
  readonly base: string;

}

/** Class that provides API urls. */
export namespace ApiUrls {
  const authPrefix = 'auth/';
  const animePrefix = 'anime/';

  /** Get authentication API urls. */
  export const authUrls: AuthUrls = {
    login: `${authPrefix}login/`,
    register: `${authPrefix}register/`,
    tokenRefresh: `${authPrefix}token/refresh/`,
  };

  /** Get anime API urls. */
  export const animeUrls: AnimeUrls = {
    base: `${animePrefix}anime/`,
  };
}
