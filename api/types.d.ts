import { Types } from 'mongoose';

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

export interface ServicesPriceNumber {
  name: string;
  price: number;
}

export interface Client {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
}

export interface ExpertMiniWithoutPic {
  _id: Types.ObjectId;
  user: UserMiniWithId;
  title: string;
}

export interface Date {
  _id: Types.ObjectId;
  date: string;
}

export interface AppointmentFull {
  service: ServicesPriceNumber;
  _id: Types.ObjectId;
  client: Client;
  expert: ExpertMiniWithoutPic;
  date: Date;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}
