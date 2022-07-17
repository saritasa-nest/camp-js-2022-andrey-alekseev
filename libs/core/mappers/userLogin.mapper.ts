import { LoginData } from '../models/user';
import { UserLoginDto } from '../dtos/userLogin.dto';

export namespace UserLoginMapper {

  /**
   * Maps form to dto.
   * @param loginData User login data.
   */
  export function toDto(loginData: LoginData): UserLoginDto {
    return {
      email: loginData.email,
      password: loginData.password,
    } as UserLoginDto;
  }
}
