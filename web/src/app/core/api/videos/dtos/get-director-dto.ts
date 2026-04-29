import { VideoDirector } from '../../../models/videos/video-director';

export interface GetDirectorDto {
  id: number;
  name: string;
  fileUrl: string | null;
}

export const mapFromGetDirectorDtoToVideoDirector = (
  dto: GetDirectorDto,
): VideoDirector => {
  return new VideoDirector(
    String(dto.id),
    dto.name,
    dto.fileUrl,
  );
};
