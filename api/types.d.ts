import { Types } from 'mongoose';
import { WebSocket } from 'ws';

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

export interface IUserFull extends IUser {
  _id: Types.ObjectId;
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

export interface IDate {
  _id: Types.ObjectId;
  date: string;
}

export interface AppointmentFull {
  service: ServicesPriceNumber;
  _id: Types.ObjectId;
  client: Client;
  expert: ExpertMiniWithoutPic;
  date: IDate;
  startTime: string;
  endTime: string;
  isApproved: boolean;
}

export interface ActiveConnections {
  [id: string]: WebSocket;
}

export interface IncomingMessage {
  type: string;
  payload: IMessageWithoutDate;
}

export interface IMessageWithoutDate {
  username: string;
  text: string;
}

export interface IMessage extends IMessageWithoutDate {
  createdAt: Date;
}
