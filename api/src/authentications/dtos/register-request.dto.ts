import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class RegisterRequestDto {
  @ApiProperty({
    description: `User's email`,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: `User's password`,
    required: true,
  })
  password: string;

  @ApiProperty({
    description: `User's first name`,
    required: true,
  })
  firstName: string;

  @ApiProperty({
    description: `User's last name`,
    required: true,
  })
  lastName: string;
}

export const mapFromRegisterRequestDtoToUser = (dto: RegisterRequestDto): User => {
  return new User({
    email: dto.email,
    password: dto.password,
    firstName: dto.firstName,
    lastName: dto.lastName,
  });
}
