import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { UserItemModule } from 'src/app/common/modules/user-item/user-item.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BirthdayPersonsComponent } from './birthday-persons.component';
import { BirthdayPersonsWidgetFacade } from './birthday-persons.widget.facade.sevice';

const DECLARATIONS = [
  BirthdayPersonsComponent
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    UserItemModule,
    SharedModule,
  ],
  exports:[DECLARATIONS],
  providers: [BirthdayPersonsWidgetFacade],
})
export class BirthdayPersonsWidgetModule {}
