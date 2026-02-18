import { IsMongoId, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../../user/schemas/user.schema';

export class AssignRoleDto {
  @IsMongoId()
  id: string;
  
  @IsEnum(UserRole)
  role: UserRole;
}
