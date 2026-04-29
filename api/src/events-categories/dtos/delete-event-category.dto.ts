import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventCategoryResponseDto {
  @ApiProperty({
    description: 'Message de confirmation de suppression',
    example: 'La catégorie a été supprimée avec succès.',
  })
  message: string;

  constructor() {
    this.message = 'La catégorie a été supprimée avec succès.';
  }
}
