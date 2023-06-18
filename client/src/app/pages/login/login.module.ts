import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { LoginModule } from 'src/app/common/modules/login/login.module';

const DECLARATIONS = [
  LoginComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    SharedModule,
    LoginModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      }
    ]),
  ],

  providers: [],
})
export class LoginPageModule {}
