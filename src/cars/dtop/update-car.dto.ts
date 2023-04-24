import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateCardDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?:    string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    readonly model?: string;
}