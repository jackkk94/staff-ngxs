import { New, NewRequest } from '../../new/models/new.model';
import { Mode } from '../components/new/new.component';

export enum NewActionTypes {
  LOAD_NEW = '[NEW] LOAD_NEW',
  LOAD_NEW_COMPLETE = '[NEW] LOAD_NEW_COMPLETE',
  LOAD_NEW_ERROR = '[NEW] LOAD_NEW_ERROR',
  LOAD_DATASOURCES = '[NEW] LOAD_DATASOURCES',
  LOAD_DATASOURCES_COMPLETE = '[NEW] LOAD_DATASOURCES_COMPLETE',
  UPDATE_NEW = '[NEW] UPDATE_NEW',
  UPDATE_NEW_COMPLETE = '[NEW] UPDATE_NEW_COMPLETE',
  CREATE_NEW = '[NEW] CREATE_NEW',
  CREATE_NEW_COMPLETE = '[NEW] CREATE_NEW_COMPLETE',
  CANCEL_UPDATE = '[NEW] CANCEL_CREATE',
}

export class LoadNew {
  static readonly type = NewActionTypes.LOAD_NEW;
  constructor(public payload: string) {}
}

export class LoadNewComplete {
  static readonly type = NewActionTypes.LOAD_NEW_COMPLETE;
  constructor(public payload: New) {}
}

export class CancelUpdate {
  static readonly type = NewActionTypes.CANCEL_UPDATE;
}

export class LoadNewError {
  static readonly type = NewActionTypes.LOAD_NEW_ERROR;
}

export class LoadDataSources {
  static readonly type = NewActionTypes.LOAD_DATASOURCES;
}

export class LoadDataSourcesComplete {
  static readonly type = NewActionTypes.LOAD_DATASOURCES_COMPLETE;
  constructor(public payload: any) {}
}

export class UpdateNew {
  static readonly type = NewActionTypes.UPDATE_NEW;
  constructor(public payload: { id: string; data: NewRequest }) {}
}

export class UpdateNewComplete {
  static readonly type = NewActionTypes.UPDATE_NEW_COMPLETE;
  constructor(public payload: New) {}
}

export class CreateNew {
  static readonly type = NewActionTypes.CREATE_NEW;
  constructor(public payload: NewRequest) {}
}

export class CreateNewComplete {
  static readonly type = NewActionTypes.CREATE_NEW_COMPLETE;
  constructor(public payload: New) {}
}

export const NewActions = {
  LoadNew,
  LoadNewComplete,
  LoadNewError,
  LoadDataSources,
  UpdateNew,
  UpdateNewComplete,
  CreateNew,
  CreateNewComplete,
  LoadDataSourcesComplete,
  CancelUpdate,
};
