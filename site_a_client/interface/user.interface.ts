import { Dispatch, SetStateAction } from "react";

export interface IUserData {
  userCode?: string;
  userId?: string;
}

export interface IGlobal {
  userToken?: string;
  setUserToken?: Dispatch<SetStateAction<string>>;
  isLogin?: boolean;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
  userData?: IUserData;
}
