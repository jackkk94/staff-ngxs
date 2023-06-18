import { Injectable } from '@angular/core';
import { UserUpdateRequest } from './components/user/models/user.model';

import { CancelUpdate, LoadProjectTeam, LoadUser, UpdateUser } from './store/user.actions';
import { Store } from '@ngxs/store';
import { UserSelectors } from './store/user.selectors';

export type UserPageMode = 'view' | 'edit';

@Injectable()
export class UserFacade {
  public initialValue$ = this.store.select(UserSelectors.initialValue);
  public projectTeam$ = this.store.select(UserSelectors.projectTeam);
  public teamMembers$ = this.store.select(UserSelectors.teamMembers);

  public pageMode: UserPageMode = 'view';

  constructor(
    private store: Store,
  ) {
  }

  public loadUser(id: string): void {
    this.store.dispatch(new LoadUser(id));
  }

  public loadProjectTeam(id: string): void {
    this.store.dispatch(new LoadProjectTeam(id));
  }

  public updateUser(id: string, data: UserUpdateRequest): void {
    this.store.dispatch(new UpdateUser({ id, data }));
  }

  public setMode(mode: UserPageMode): void {
    this.pageMode = mode;
  }

  public cancelUpdate(): void {
    this.store.dispatch(new CancelUpdate())
  }
}
