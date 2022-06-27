import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { http } from '..';

import { KEY_ACCESS_TOKEN, KEY_EMAIL } from '../../../utils/localStorageKeys';

import { StorageService } from './storageService';

const url = 'users/';

export namespace UserService {

  /** Get user profile. */
  export async function getProfile(): Promise<User> {
    const { data } = await http.get<UserDto>(`${url}profile/`);
    return UserMapper.fromDto(data);
  }

  /** Get user's email. */
  export async function getEmail(): Promise<string | null> {
    const accessToken = await StorageService.get<string>(KEY_ACCESS_TOKEN);
    if (accessToken === null) {
      return null;
    }

    const email = await StorageService.get<string>(KEY_EMAIL);
    if (email !== null) {
      return email;
    }
    const user = await getProfile();
    await StorageService.set(KEY_EMAIL, user.email);
    return user.email;
  }

}
