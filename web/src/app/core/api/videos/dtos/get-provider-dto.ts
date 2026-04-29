import { VideoProvider } from "../../../models/videos/video-provider";

export interface GetProviderDto {
  id: number;
  fileUrl: string;
  name: string;
}

export const mapFromGetProviderDtoToVideoProvider = (
  dto: GetProviderDto,
): VideoProvider => {
  return new VideoProvider(
    dto.id,
    dto.fileUrl,
    dto.name,
  );
};

export const mapFromGetProviderDtoArrayToVideoProviderArray = (
  dtos: GetProviderDto[],
): VideoProvider[] => {
  return dtos.map(mapFromGetProviderDtoToVideoProvider);
};