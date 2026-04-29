import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventResponseDto {
  @ApiProperty({
    description: 'Message de confirmation de suppression',
    example: 'L\'événement a été supprimé avec succès.',
  })
  message: string;

  constructor() {
    this.message = "L'événement a été supprimé avec succès.";
  }
}
