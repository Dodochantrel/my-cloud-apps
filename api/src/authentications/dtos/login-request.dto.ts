import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description: `User's email`,
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `User's password`,
    required: true,
  })
  @IsString()
  @MinLength(1)
  password: string;

  @ApiProperty({
    description: `Remember me option`,
    required: true,
  })
  @IsBoolean()
  rememberMe: boolean;
}
