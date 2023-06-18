import { catchError, forkJoin, map } from 'rxjs';
import { Injectable } from '@angular/core';


import { User } from 'src/app/common/models/user.model';
import { State, Store, Action, StateContext } from '@ngxs/store';
import {
  LoadFiltersDataComplete,
  LoadUsers,
  LoadUsersComplete,
  LoadUsersError,
  UsersActions,
} from './users.actions';
import { CitiesApi } from '../api/cities.api.service';
import { PositionsApi } from '../api/positions.api.service';
import { UsersApi } from '../api/users.api.service';
import { UserSearchFilter, UserFiltersData } from '../models/user-search.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/components/pagination/pagination.component';

export interface UsersState {
  users: User[];
  totalUsers: number;
  loading: boolean;
  filtersValue: UserSearchFilter;
  filtersData: UserFiltersData;
}

export const DEFAULT_USERS_FILTERS_VALUE = {
  fullName: '',
  city: [],
  position: [],
  take: DEFAULT_PAGE_SIZE,
  skip: 0,
} as UserSearchFilter;

export const DEFAULT_USERS_FILTERS_DATA = {
  cities: [],
  positions: [],
} as UserFiltersData;

const initialState = {
  users: [],
  totalUsers: 0,
  loading: false,
  filtersValue: DEFAULT_USERS_FILTERS_VALUE,
  filtersData: DEFAULT_USERS_FILTERS_DATA,
};
@State<UsersState>({
  name: 'appUsersState',
  defaults: initialState,
})
@Injectable()
export class AppUsersState {
  constructor(
    private usersApi: UsersApi,
    private store: Store,
    private citiesApi: CitiesApi,
    private positionsApi: PositionsApi
  ) {}

  @Action(UsersActions.LoadUsers)
  LoadUsers({ setState, getState, dispatch }: StateContext<UsersState>) {
    setState({
      ...getState(),
      loading: true,
    });

    const filtersValue = this.store.selectSnapshot(
      (store) => store.appUsersState.filtersValue
    );

    return this.usersApi.getUsers(filtersValue).pipe(
      map((users) => dispatch(new LoadUsersComplete(users))),
      catchError(async () => dispatch(new LoadUsersError()))
    );
  }

  @Action(UsersActions.LoadUsersComplete)
  LoadUsersComplete(
    { setState, getState }: StateContext<UsersState>,
    { payload }
  ) {
    setState({
      ...getState(),
      loading: false,
      users: payload?.result ?? [],
      totalUsers: payload?.total ?? 0,
    });
  }

  @Action(UsersActions.UpdateFilters)
  UpdateFilters(
    { setState, getState, dispatch }: StateContext<UsersState>,
    { payload }
  ) {
    setState({
      ...getState(),
      filtersValue: { ...getState().filtersValue, ...payload },
    });

    dispatch(new LoadUsers());
  }

  @Action(UsersActions.LoadFiltersDataComplete)
  LoadFiltersDataComplete(
    { setState, getState }: StateContext<UsersState>,
    { payload }
  ) {
    setState({
      ...getState(),
      filtersData: { ...getState().filtersData, ...payload },
    });
  }

  @Action(UsersActions.LoadFiltersData)
  LoadFiltersData({ dispatch }: StateContext<UsersState>) {
    return forkJoin(
      this.positionsApi.getPositions(),
      this.citiesApi.getCities()
    ).pipe(
      map(([positions, cities]) =>
        dispatch(new LoadFiltersDataComplete({ positions, cities }))
      )
    );
  }
}
