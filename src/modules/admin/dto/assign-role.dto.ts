import { IsMongoId, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
  
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
