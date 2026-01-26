import { VideoProvider } from "../../../models/videos/video-provider";

export interface getProviderDto {
  id: number;
  fileUrl: string;
  name: string;
}

export const mapFromGetProviderDtoToVideoProvider = (
  dto: getProviderDto,
): VideoProvider => {
  return new VideoProvider(
    dto.id,
    dto.fileUrl,
    dto.name,
  );
};

export const mapFromGetProviderDtoArrayToVideoProviderArray = (
  dtos: getProviderDto[],
): VideoProvider[] => {
  return dtos.map(mapFromGetProviderDtoToVideoProvider);
};