export interface IUser {
  email:string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  token: string;
  role: string;
  googleId?: string;
  avatar: string | null;f
}
