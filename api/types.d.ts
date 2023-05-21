import { Types } from "mongoose";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  token: string;
  role: string;
  googleId?: string;
  avatar: string | null;
}

export interface IService {
  name: string;
  price: string;
}

export interface IAppointment {
  client: Types.ObjectId;
  expert: Types.ObjectId;
  service: IService;
  date: Types.ObjectId;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}
