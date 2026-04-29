import { VideoTrailer } from "../../../models/videos/video-trailer";

export interface GetTrailerDto {
    url: string;
}

export const mapFromGetTrailerDtoToVideoTrailer = (dto: GetTrailerDto): VideoTrailer => {
    return new VideoTrailer(dto.url);
};