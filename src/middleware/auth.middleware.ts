import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const excludedRoutes = ['/auth', '/v1'];
    for (const route of excludedRoutes) {
      if (req.path.startsWith(route)) {
        return next();
      }
    }

    const token: any = req.headers['auth'];
    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
