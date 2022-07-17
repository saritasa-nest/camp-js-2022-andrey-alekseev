import { RegistrationData } from '../models/user';
import { UserRegistrationDto } from '../dtos/userRegistration.dto';

export namespace UserRegistrationMapper {

  /**
   * Maps form to dto.
   * @param registrationData User registration data.
   */
  export function toDto(registrationData: RegistrationData): UserRegistrationDto {
    return {
      email: registrationData.email,
      first_name: registrationData.firstName,
      last_name: registrationData.lastName,
      password: registrationData.password,
    } as UserRegistrationDto;
  }
}
