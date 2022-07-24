import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { http } from '..';
import { KEY_EMAIL } from '../../../utils/localStorageKeys';
import { UserHelpers } from '../helpers';

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
    if (!(await UserHelpers.isUserLoggedIn())) {
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
