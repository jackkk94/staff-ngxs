import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { NewsComponent } from './components/news/news.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsFacade } from './news.facade.sevice';
import { NewCardModule } from 'src/app/common/modules/new-card/new-card.module';
import { NgxsModule } from '@ngxs/store';
import { AppNewsState } from './store/news.state';

const DECLARATIONS = [NewsComponent, NewsListComponent];
@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    SharedModule,
    NewCardModule,
    NgxsModule.forFeature([AppNewsState]),
    RouterModule.forChild([
      {
        path: '',
        component: NewsComponent,
      },
      {
        path: ':id',
        loadChildren: () =>
          import('./../new/new.page.module').then((m) => m.NewPageModule),
      },
    ]),
  ],

  providers: [NewsFacade],
})
export class NewsPageModule {}
