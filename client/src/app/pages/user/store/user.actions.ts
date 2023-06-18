import { User } from 'src/app/common/models/user.model';
import { UserUpdateRequest } from '../components/user/models/user.model';
import { Project } from 'src/app/common/models/project.model';

export enum UserActionTypes {
  LOAD_USER = '[USER] LOAD_USER',
  LOAD_USER_COMPLETE = '[USER] LOAD_USER_COMPLETE',
  LOAD_USER_ERROR = '[USER] LOAD_USER_ERROR',
  LOAD_PROJECT_TEAM = '[USER] LOAD_PROJECT_TEAM',
  LOAD_PROJECT_TEAM_COMPLETE = '[USER] LOAD_PROJECT_TEAM_COMPLETE',
  UPDATE_USER = '[USER] UPDATE_USER',
  UPDATE_USER_COMPLETE = '[USER] UPDATE_USER_COMPLETE',
  CANCEL_UPDATE = '[USER] CANCEL_CREATE',
}

export class LoadUser  {
  static readonly type = UserActionTypes.LOAD_USER;
  constructor(public payload: string) {}
}

export class LoadProjectTeam  {
  static readonly type = UserActionTypes.LOAD_PROJECT_TEAM;
  constructor(public payload: string) {}
}

export class LoadProjectTeamComplete  {
  static readonly type = UserActionTypes.LOAD_PROJECT_TEAM_COMPLETE;
  constructor(public payload: Project) {}
}

export class LoadUserComplete  {
  static readonly type = UserActionTypes.LOAD_USER_COMPLETE;
  constructor(public payload: User) {}
}

export class CancelUpdate  {
  static readonly type = UserActionTypes.CANCEL_UPDATE;
}

export class LoadUserError  {
  static readonly type = UserActionTypes.LOAD_USER_ERROR;
}

export class UpdateUser  {
  static readonly type = UserActionTypes.UPDATE_USER;
  constructor(public payload: {id: string, data: UserUpdateRequest}) {}
}

export class UpdateUserComplete  {
  static readonly type = UserActionTypes.UPDATE_USER_COMPLETE;
  constructor(public payload: User) {}
}

export const UserActions = {
   LoadUser,
   LoadUserComplete,
   LoadUserError,
   UpdateUser,
   UpdateUserComplete,
   LoadProjectTeam,
   LoadProjectTeamComplete,
   CancelUpdate 
}

