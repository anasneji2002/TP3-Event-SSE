import { Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authHeader = req.headers['auth-user'];

    if (!authHeader) {
      
      return res.status(401).json({ message: 'Vous devez être authentifié pour accéder à cette ressource.' });
    }
    try {
      const token = authHeader;
      const decodedToken = verify(token, 'secret_key') as { userId: string };


      if (!decodedToken.userId) {
        throw new Error('Token invalide.');
      }

      
      req.userId = decodedToken.userId; 
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }

  }
}
