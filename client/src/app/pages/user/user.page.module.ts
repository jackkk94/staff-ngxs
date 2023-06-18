import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserComponent } from './components/user/user.component';
import { DataRowComponent } from './components/data-row/data-row.component';
import { ProjectTeamComponent } from './components/project-team/project-team.component';
import { UserFacade } from './user.facade.sevice';
import { AppUserState } from './store/user.state';

const DECLARATIONS = [UserComponent, DataRowComponent, ProjectTeamComponent];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([AppUserState]),
    RouterModule.forChild([
      {
        path: '',
        component: UserComponent,
      },
    ]),
  ],

  providers: [UserFacade],
})
export class UserPageModule {}
