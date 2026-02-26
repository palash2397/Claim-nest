import { IsMongoId, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
  
  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
