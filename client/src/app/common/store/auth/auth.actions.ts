
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { User } from '../../models/user.model';

export enum AuthActionTypes {
  LOGIN = '[Auth] LOGIN',
  LOGIN_COMPLETE = '[Auth] LOGIN_COMPLETE',
  LOGIN_ERROR = '[Auth] LOGIN_ERROR',
  LOAD_USER_BY_ID = '[Auth] LOAD_USER_BY_ID',
  LOAD_USER_BY_ID_COMPLETE = '[Auth] LOAD_USER_BY_ID_COMPLETE',
  INIT_USER_DATA = '[Auth] INIT_USER_DATA',
}

export class Login {
  static readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: LoginRequest) {}
}

export class InitUserData {
  static readonly type = AuthActionTypes.INIT_USER_DATA;
}

export class LoginComplete {
  static readonly type = AuthActionTypes.LOGIN_COMPLETE;
  constructor(public payload: LoginResponse) {}
}

export class LoginError {
  static readonly type = AuthActionTypes.LOGIN_ERROR;
}


export const AuthActions = {
  Login,
  LoginComplete,
  LoginError,
  InitUserData
}
