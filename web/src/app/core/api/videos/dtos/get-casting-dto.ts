import { VideoCasting } from '../../../models/videos/video-casting';

export interface GetCastingDto {
  id: number;
  name: string;
  popularity: number;
  character: string;
  order: number;
  fileUrl: string | null;
}

export const mapFromGetCastingDtoToVideoCasting = (dto: GetCastingDto): VideoCasting => {
  return new VideoCasting(
    String(dto.id),
    dto.name,
    dto.popularity,
    dto.character,
    dto.order,
    dto.fileUrl ?? undefined,
  );
};

export const mapFromListGetCastingDtoToVideoCastingList = (
  dtos: GetCastingDto[],
): VideoCasting[] => {
  return dtos.map((dto) => mapFromGetCastingDtoToVideoCasting(dto));
};
