import { UserRegistrationForm } from '../forms/userRegistrationForm';

import { UserRegistrationDto } from '../dtos/userRegistration.dto';

export namespace UserRegistrationMapper {

  /**
   * Maps form to dto.
   * @param registrationForm User registration form.
   */
  export function toDto(registrationForm: UserRegistrationForm): UserRegistrationDto {
    return {
      email: registrationForm.email,
      first_name: registrationForm.firstName,
      last_name: registrationForm.lastName,
      password: registrationForm.password,
    } as UserRegistrationDto;
  }
}
