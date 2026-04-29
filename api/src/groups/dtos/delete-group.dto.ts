import { ApiProperty } from '@nestjs/swagger';

export class DeleteGroupResponseDto {
  @ApiProperty({
    description: 'Message de confirmation de suppression',
    example: 'Le groupe a été supprimé avec succès.',
  })
  message: string;

  constructor() {
    this.message = 'Le groupe a été supprimé avec succès.';
  }
}
