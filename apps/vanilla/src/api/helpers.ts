import { JWTDto } from '@js-camp/core/dtos/jwt.dto';

import { KEY_ACCESS_TOKEN, KEY_EMAIL, KEY_REFRESH_TOKEN } from '../../utils/localStorageKeys';

import { StorageService } from './services/storageService';

export namespace UserHelpers {

  /** Check if user logged in. */
  export async function isUserLoggedIn(): Promise<boolean> {
    const accessToken = await StorageService.get<string>(KEY_ACCESS_TOKEN);
    return accessToken !== null;
  }

  /**
   * Sets auth token.
   * @param token Session token.
   */
  export async function setSessionToken(token?: JWTDto): Promise<void> {
    if (token === undefined) {
      await clearUserData();
    } else {
      await StorageService.set(KEY_ACCESS_TOKEN, token.access);
      await StorageService.set(KEY_REFRESH_TOKEN, token.refresh);
    }
  }

  /**
   * Clear user data.
   */
  export async function clearUserData(): Promise<void> {
    await StorageService.remove(KEY_ACCESS_TOKEN);
    await StorageService.remove(KEY_REFRESH_TOKEN);
    await StorageService.remove(KEY_EMAIL);
  }

  /**
   * Get refresh token.
   */
  export function getRefreshToken(): Promise<string | null> {
    return StorageService.get(KEY_REFRESH_TOKEN);
  }
}
