
interface AuthUrls {

  /** Login url. */
  readonly login: string;

  /** Register url. */
  readonly register: string;

  /** Token refresh url. */
  readonly tokenRefresh: string;
}

/** Class that provides API urls. */
export class ApiUrls {

  /** Get authentication API urls. */
  public static get authUrls(): AuthUrls {
    const authPrefix = 'auth/';
    return {
      login: `${authPrefix}login/`,
      register: `${authPrefix}register/`,
      tokenRefresh: `${authPrefix}token/refresh/`,
    };
  }
}
