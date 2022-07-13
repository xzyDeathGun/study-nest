import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.url);
    const user = request.body.user;
    return this.matchRoles(roles, user.roles);
  }
  private matchRoles(roles: string[], userRoles: string) {
    const isAllow = roles.includes(userRoles);
    if (isAllow) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
