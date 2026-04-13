import { UserModel } from "../../../models/users/user-model";

export interface GetMeResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const mapFromGetMeResponseDtoToUserModel = (dto: GetMeResponseDto): UserModel => {
  return new UserModel(dto.id, dto.firstName, dto.lastName, dto.email);
}