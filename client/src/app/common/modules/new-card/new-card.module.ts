import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewCardComponent } from './components/new-card/new-card.component';

const DECLARATIONS = [NewCardComponent];
@NgModule({
  declarations: DECLARATIONS,
  imports: [SharedModule, RouterModule],
  exports: DECLARATIONS,
})
export class NewCardModule {}
