// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   ForbiddenException,
// } from '@nestjs/common';
// import { ApiResponse } from '../../../utils/helper/ApiResponse'; // adjust path

// @Injectable()
// export class RoleGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();

//     const user = request.user;

//     console.log('User Role:', user?.role);

//     if (user?.role !== 'Admin') {
//       throw new ForbiddenException(
//         new ApiResponse(401, {}, 'Access is forbidden'),
//       );
//     }

//     return true;
//   }
// }


import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../../user/schemas/user.schema';
import { ApiResponse } from '../../../utils/helper/ApiResponse';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // No role restriction
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        new ApiResponse(403, {}, 'Access is forbidden'),
      );
    }

    return true;
  }
}


//nest g guard modules/auth/roles