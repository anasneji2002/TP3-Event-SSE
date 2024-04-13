import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRoleEnum } from 'src/enums/user-roles.enum';
@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role === UserRoleEnum.ADMIN) {
            return true;
        } else {
            return false;
        }
    }
}