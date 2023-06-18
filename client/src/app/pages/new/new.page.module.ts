import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './components/new/new.component';
import { NewFacade } from './new.facade.sevice';
import { NgxsModule } from '@ngxs/store';
import { AppNewState } from './store/new.state';

const DECLARATIONS = [
  NewComponent
];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forFeature([AppNewState]),
    RouterModule.forChild([
      {
        path: '',
        component: NewComponent,
      },
    ]),
    
  ],

  providers: [NewFacade],
})
export class NewPageModule {}
