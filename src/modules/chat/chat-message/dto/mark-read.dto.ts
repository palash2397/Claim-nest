import { IsArray, IsMongoId } from 'class-validator';

export class MarkReadDto {
  @IsArray()
  @IsMongoId({ each: true })
  messageIds: string[];
}