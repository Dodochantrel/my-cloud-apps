import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.entity";
import { PageQuery } from "src/pagination/page-query";
import { IsString } from "class-validator";

export class GetAllUsersQueryDto extends PageQuery {
  @ApiProperty({
    description: 'Terme de recherche pour filtrer les utilisateurs par email',
    example: '',
    required: false,
  })
  @IsString()
  search?: string;
}

export class GetAllUsersResponseDto {
  @ApiProperty({ description: 'Identifiant de l\'utilisateur', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Prénom de l\'utilisateur', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Doe' })
  lastName: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}