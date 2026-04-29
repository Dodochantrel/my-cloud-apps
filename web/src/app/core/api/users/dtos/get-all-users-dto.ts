import { UserModel } from "../../../models/users/user-model";

export interface GetAllUsersResponseDto {
  id: string;
  firstName: string;
  lastName: string;
}

export const mapFromGetAllUsersDtosToUserModels = (dtos: GetAllUsersResponseDto[]): UserModel[] => {
  return dtos.map(dto => new UserModel(dto.id, dto.firstName, dto.lastName, null));
}