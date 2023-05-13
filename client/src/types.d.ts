export enum UserRole {
  User = 'user',
  Expert = 'expert',
  Admin = 'admin',
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
  role: UserRole;
  avatar: string | null;
  googleId?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
  phoneNumber: string;
}


export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Services {
  name: string;
  price: string;
}

export interface ServicesFull extends Services {
  _id: string;
  price: number;
}

export interface UserMini {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface ExpertMutation {
  user: string;
  title: string;
  info: string;
  photo: File | null;
  services: Services[];
}

export interface ExpertFull {
  _id: string;
  user: UserMini;
  title: string;
  info: string;
  photo: string;
  services: ServicesFull[]
}

export interface ExpertMini {
  _id: string;
  user: UserMini;
  title: string;
  photo: string;
}

export interface IPagination<Type> {
  [key: string]: Type[];

  currentPage: number;
  totalCount: number;
}

export interface ApiResponse<Type> {
  message: 'string';
  result: Type | IPagination<Type>;
}

export interface AdminFilters {
  id: number;
  name: string;
  link: string;
}

export interface ServiceHourMutation {
  "expert": string,
  "date": string,
}

export interface ServiceHours {
  _id: string
  expert: string
  date: string
  hours: Hour[]
  createdAt: string
  updatedAt: string
}

export interface HourMutation {
  startTime: string
  endTime: string
}

export interface Hour extends HourMutation{
  _id: string
  status: boolean
}

export interface AppointmentMutation {
  expert: string;
  service: { name: string, price: number };
  date: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  _id: string;
  expert: {
    firstName: string,
    lastName: string,
    title,
  },
  service: ServicesFull,
  startTime: string;
  endTime: string;
  isApproved: boolean
}
