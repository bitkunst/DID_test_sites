import { Dispatch, SetStateAction } from "react";

export interface IUserData {
  userCode?: string;
  userId?: string;
  point?: number;
  isVerified?: boolean;
}

export interface IGlobal {
  userToken?: string;
  setUserToken?: Dispatch<SetStateAction<string>>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
  userData?: IUserData;
  setUserData?: Dispatch<SetStateAction<IUserData>>;
}
