import { UserLoginForm } from '../forms/userLoginForm';

import { UserLoginDto } from '../dtos/userLogin.dto';

export namespace UserLoginMapper {

  /**
   * Maps form to dto.
   * @param registrationForm User registration form.
   */
  export function toDto(registrationForm: UserLoginForm): UserLoginDto {
    return {
      email: registrationForm.email,
      password: registrationForm.password,
    } as UserLoginDto;
  }
}
