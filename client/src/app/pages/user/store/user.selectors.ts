import { User } from 'src/app/common/models/user.model';
import { Project } from 'src/app/common/models/project.model';
import { UserState } from './user.state';
import { Select } from '@ngxs/store';

type state = { appUserState: UserState };

export class UserSelectors {
  @Select()
  public static initialValue({ appUserState }: state): User {
    return appUserState.initialValue;
  }

  @Select()
  public static projectTeam({ appUserState }: state): Project {
    return appUserState.team;
  }

  @Select()
  public static teamMembers({ appUserState }: state): User[] {
    return appUserState.team.members;
  }
}
