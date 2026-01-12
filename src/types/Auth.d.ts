import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IActivation {
  code: string;
}

interface ILogin {
  identifier: string
  password: string
}

interface IProfile {
  _id?: string
  email?: string
  fullname?: string
  username?: string
  isActive?: boolean
  profilePicture?: string | FileList
  role?: string
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

export type {
  IRegister,
  IActivation,
  ILogin,
  IProfile,
  UserExtended,
  SessionExtended,
  JWTExtended,
};
