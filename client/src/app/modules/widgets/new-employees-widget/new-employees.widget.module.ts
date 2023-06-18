import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NewEmployeesWidgetComponent } from './new-employees-widget.component';
import { NewEmployeesWidgetFacade } from './new-employees.widget.facade.sevice';
import { UserItemModule } from 'src/app/common/modules/user-item/user-item.module';
import { SharedModule } from 'src/app/shared/shared.module';

const DECLARATIONS = [
  NewEmployeesWidgetComponent
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    UserItemModule,
    SharedModule,
  ],

  exports:[DECLARATIONS],
  providers: [NewEmployeesWidgetFacade],
})
export class NewEmployeesWidgetModule {}
