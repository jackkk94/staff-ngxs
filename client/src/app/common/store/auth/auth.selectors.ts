import { Select, Selector, createPropertySelectors } from '@ngxs/store';

import { AppAuthState, AuthState } from './auth.state';
import { User } from '../../models/user.model';

type state = {appAuthState: AuthState};

export class AuthSelectors {

  @Select()
  public static UserToken({appAuthState}: state): string {
    return appAuthState.userMeta.token;
  }

  @Select()
  public static loggedIn({appAuthState}: state): boolean {
    return appAuthState.loggedIn;
  }

  @Select()
  public static user({appAuthState}: state): User {
    return appAuthState.user;
  }

  @Select()
  public static UserId({appAuthState}: state): string {
    return appAuthState.userMeta.id;
  }
}
