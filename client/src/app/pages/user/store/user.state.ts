import {
  State,
  Action,
  StateContext,
  Store,
} from '@ngxs/store';

import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';

import { Project } from 'src/app/common/models/project.model';
import { User } from 'src/app/common/models/user.model';
import { UsersApi } from '../../users/api/users.api.service';
import { ProjectsApi } from '../api/projects.api.service';
import {
  LoadProjectTeamComplete,
  LoadUserComplete,
  LoadUserError,
  UpdateUserComplete,
  UserActions,
} from './user.actions';
import { UserUpdateRequest } from '../components/user/models/user.model';

export interface UserState {
  initialValue: User;
  team: Project;
}

const initialState = {
  initialValue: null,
  team: null,
} as UserState;

@State<UserState>({
  name: 'appUserState',
  defaults: initialState,
})
@Injectable()
export class AppUserState {
  constructor(
    private usersApi: UsersApi,
    private store: Store,
    private projectsApi: ProjectsApi,
    private router: Router
  ) {}

  @Action(UserActions.UpdateUserComplete)
  @Action(UserActions.LoadUserComplete)
  fn({ setState, getState }: StateContext<UserState>, { payload }) {
    setState({
      ...getState(),
      initialValue: payload,
    });
  }

  @Action(UserActions.LoadProjectTeamComplete)
  LoadProjectTeamComplete(
    { setState, getState }: StateContext<UserState>,
    { payload }
  ) {
    setState({
      ...getState(),
      team: payload,
    });
  }

  @Action(UserActions.LoadUser)
  LoadUser({ dispatch }: StateContext<UserState>, { payload }) {
    return this.usersApi.getUserById(payload).pipe(
      map((result) => dispatch(new LoadUserComplete(result))),
      catchError(async () => {
        this.router.navigate(['/employees']);
        return dispatch(new LoadUserError());
      })
    );
  }

  @Action(UserActions.LoadProjectTeam)
  LoadProjectTeam({ dispatch }: StateContext<UserState>, { payload }) {
    return this.projectsApi
      .getProjectById(payload)
      .pipe(map((result) => dispatch(new LoadProjectTeamComplete(result))));
  }

  @Action(UserActions.CancelUpdate)
  CancelUpdate({ dispatch }: StateContext<UserState>, { payload }) {
    const initialValue = this.store.selectSnapshot(
      (store) => store.appNewState.initialValue
    );

    dispatch(new LoadUserComplete(initialValue));
  }

  @Action(UserActions.UpdateUser)
  UpdateUser({ dispatch }: StateContext<UserState>, { payload }) {
    const { id, data } = payload as { id: string; data: UserUpdateRequest };

    return this.usersApi
      .updateUserById(id, data)
      .pipe(map((result) => dispatch(new UpdateUserComplete(result))));
  }
}
