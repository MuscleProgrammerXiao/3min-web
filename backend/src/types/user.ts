export interface IUser {
  _id?: string;
  username: string;
  password: string;
  role: 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  username: string;
  role: string;
  createdAt: Date;
}

export interface IJWTPayload {
  userId: string;
  username: string;
  role: string;
  iat?: number;
  exp?: number;
}