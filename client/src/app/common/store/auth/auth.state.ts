import {
  State,
  Selector,
  Action,
  StateContext,
  createPropertySelectors,
} from '@ngxs/store';
import { LoginRequest, LoginResponse } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { AuthActions, Login, LoginComplete, LoginError } from './auth.actions';
import { Router } from '@angular/router';
import { AuthApi } from 'src/app/pages/login/api/auth.api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { catchError, tap } from 'rxjs';
import { AUTH_KEY } from 'src/app/modules/core/services/auth.facade.sevice';
import { Injectable } from '@angular/core';

export interface AuthState {
  userMeta: LoginResponse;
  user: User;
  loggedIn: boolean;
  hasError: boolean;
}

const initialState = {
  user: null,
  userMeta: null,
  loggedIn: false,
  hasError: false,
};
@State<AuthState>({
    name: 'appAuthState',
    defaults: initialState
})
@Injectable()
export class AppAuthState {
  constructor(
    private authApi: AuthApi,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  @Action(AuthActions.Login)
  startLogin(
    { dispatch }: StateContext<AuthState>,
    {payload}
  ) {
    return this.authApi.login(payload).pipe(
      tap((userMeta) => {
        this.localStorageService.setData(AUTH_KEY, userMeta);
        this.router.navigate(['/']);

        dispatch(new LoginComplete(userMeta));
      },
      catchError(async () => dispatch(new LoginError())))
    );
  }

  @Action(AuthActions.LoginComplete)
  completeLogin({ getState, setState }: StateContext<AuthState>, {payload}) {
    setState({
        ...getState(),
        loggedIn: true,
        userMeta: payload,
        user: payload.user,
    });
  }

  @Action(AuthActions.LoginError)
  failLogin({ getState, setState }: StateContext<AuthState>) {
    setState({
      ...getState(),
      hasError: true,
    });
  }
}
