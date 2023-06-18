import { Injectable } from '@angular/core';
import { NewsSearchFilter } from './models/news-search.model';


import { LoadFiltersData, UpdateFilters } from './store/news.actions';
import { NewsSelectors } from './store/news.selectors';
import { Select, Store } from '@ngxs/store';
import { AppNewsState } from './store/news.state';
import { Observable } from 'rxjs';
import { New } from '../new/models/new.model';

@Injectable()
export class NewsFacade {
  public filtersData$ = this.store.select(NewsSelectors.filtersData);
  public filtersValue$ = this.store.select(NewsSelectors.filtersValue);
  public filterByCategoriesData$ = this.store.select(
    NewsSelectors.filterByCategoriesData
  );
  public filterByTitleValue$ = this.store.select(
    NewsSelectors.filterByTitleValue
  );
  public filterByCategoriesValue$ = this.store.select(
    NewsSelectors.filterByCategoriesValue
  );
  public skipValue$ = this.store.select(NewsSelectors.skipValue);
  public totalNews$ = this.store.select(NewsSelectors.totalNews);
  public news$ = this.store.select(NewsSelectors.news);

  constructor(
    private store: Store,
  ) {
  }

  public updateFilters(filters: Partial<NewsSearchFilter>): void {
    this.store.dispatch(new UpdateFilters(filters));
  }

  public LoadFiltersData(): void {
    this.store.dispatch(new LoadFiltersData());
  }
}
