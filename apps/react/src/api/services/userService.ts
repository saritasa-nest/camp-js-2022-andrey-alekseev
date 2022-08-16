import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';

import { http } from '..';

const url = 'users/';

export namespace UserService {

  /** Get user profile. */
  export async function getProfile(): Promise<User> {
    const { data } = await http.get<UserDto>(`${url}profile/`);
    return UserMapper.fromDto(data);
  }

}
