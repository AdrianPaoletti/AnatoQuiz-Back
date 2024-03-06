export interface UserAuthRepository {
  comparePassword(password: string, hashedPassword: string): boolean;
  generateToken(id: string): Promise<string>;
  validateToken(token: string): Promise<string>;
}
