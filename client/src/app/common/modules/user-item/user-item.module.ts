import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserItemComponent } from './components/user-item/user-item.component';

const DECLARATIONS = [UserItemComponent];
@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, SharedModule, RouterModule],
  exports: DECLARATIONS,
})
export class UserItemModule {}
