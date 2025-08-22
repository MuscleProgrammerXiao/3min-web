import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../types/user';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class JWTUtils {
  static generateToken(payload: Omit<IJWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload as any, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    } as jwt.SignOptions);
  }

  static verifyToken(token: string): IJWTPayload {
    return jwt.verify(token, JWT_SECRET) as IJWTPayload;
  }

  static decodeToken(token: string): IJWTPayload | null {
    try {
      return jwt.decode(token) as IJWTPayload;
    } catch (error) {
      return null;
    }
  }
}