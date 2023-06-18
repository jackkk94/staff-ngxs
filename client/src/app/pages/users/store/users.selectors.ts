import { UserFiltersData, UserSearchFilter } from '../models/user-search.model';
import { Select } from '@ngxs/store';
import { User } from 'src/app/common/models/user.model';
import { Position } from 'src/app/common/models/position.model';
import { City } from 'src/app/common/models/city.model';
import { Guid } from 'guid-typescript';
import { UsersState } from './users.state';

type state = { appUsersState: UsersState };

export class UsersSelectors {
  @Select()
  public static users({ appUsersState }: state): User[] {
    return appUsersState.users;
  }

  @Select()
  public static isLoading({ appUsersState }: state): boolean {
    return appUsersState.loading;
  }

  @Select()
  public static totalUsers({ appUsersState }: state): number {
    return appUsersState.totalUsers;
  }

  @Select()
  public static filtersData({ appUsersState }: state): UserFiltersData {
    return appUsersState.filtersData;
  }

  @Select()
  public static filtersValue({ appUsersState }: state): UserSearchFilter {
    return appUsersState.filtersValue;
  }

  @Select()
  public static filterByPositionsData({ appUsersState }: state): Position[] {
    return appUsersState.filtersData.positions;
  }

  @Select()
  public static filterByPositionsValue({ appUsersState }: state): Guid[] {
    return appUsersState.filtersValue.position;
  }

  @Select()
  public static filterByTitleValue({ appUsersState }: state): string {
    return appUsersState.filtersValue.fullName;
  }

  @Select()
  public static filterByCitiesData({ appUsersState }: state): City[] {
    return appUsersState.filtersData.cities;
  }

  @Select()
  public static skipValue({ appUsersState }: state): number {
    return appUsersState.filtersValue.skip;
  }
}
