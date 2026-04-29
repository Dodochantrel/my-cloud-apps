import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class GetMeResponseDto {
  @ApiProperty({
    description: 'User ID',
  })
  id!: string;

  @ApiProperty({
    description: 'User email',
  })
  email!: string;

  @ApiProperty({
    description: 'User first name',
  })
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
  })
  lastName!: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
