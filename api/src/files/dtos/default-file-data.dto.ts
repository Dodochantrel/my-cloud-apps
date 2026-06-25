import { ApiProperty } from "@nestjs/swagger";
import { FileData } from "../file-data.entity";

export class DefaultFileDataResponseDto {
    @ApiProperty({ format: 'uuid' })
    id!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    mimetype!: string;

    @ApiProperty()
    size!: number;

    @ApiProperty()
    path!: string;

    constructor(fileData: FileData) {
        this.id = fileData.id;
        this.name = fileData.name;
        this.mimetype = fileData.mimetype;
        this.size = fileData.size;
        this.path = fileData.path;
    }
}