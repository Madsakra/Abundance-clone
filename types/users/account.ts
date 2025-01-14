export type UserRole = 'free_user' | 'premium_user' | 'nutritionist' | 'admin';

export interface UserAccount {
  email: string;
  name: string;
  role: UserRole;
}
