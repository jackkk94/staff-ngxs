import { State, Action, StateContext, Store } from '@ngxs/store';
import { catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { New } from '../../new/models/new.model';
import { NewsSearchFilter, NewsFiltersData } from '../models/news-search.model';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/components/pagination/pagination.component';
import {
  LoadFiltersDataComplete,
  LoadNews,
  LoadNewsError,
  NewsActions,
} from './news.actions';
import { NewsApi } from '../api/news.api.service';
import { NewCategoriesApi } from '../api/new-categories.api.service';

export interface NewsState {
  news: New[];
  totalNews: number;
  loading: boolean;
  filtersValue: NewsSearchFilter;
  filtersData: NewsFiltersData;
}

export const DEFAULT_NEWS_FILTERS_VALUE = {
  fullName: '',
  newCategories: [],
  take: DEFAULT_PAGE_SIZE,
  skip: 0,
} as NewsSearchFilter;

export const DEFAULT_NEWS_FILTERS_DATA = {
  newCategories: [],
} as NewsFiltersData;

const initialState = {
  news: [],
  loading: false,
  filtersValue: DEFAULT_NEWS_FILTERS_VALUE,
  filtersData: DEFAULT_NEWS_FILTERS_DATA,
  totalNews: 0,
};

@State<NewsState>({
  name: 'appNewsState',
  defaults: initialState,
})
@Injectable()
export class AppNewsState {
  constructor(
    private newsApi: NewsApi,
    private newCategoriesApi: NewCategoriesApi,
    private store: Store
  ) {}

  @Action(NewsActions.LoadNews)
  loadNews({ setState, getState, dispatch }: StateContext<NewsState>) {
    setState({
      ...getState(),
      loading: true,
    });

    const filters = (
      this.store.selectSnapshot((store) => store.appNewsState.filtersValue)
    );

    return this.newsApi.getNews(filters).pipe(
      map(
        (news) => dispatch(new NewsActions.LoadNewsComplete(news)),
        catchError(async () => dispatch(new LoadNewsError()))
      )
    );
  }

  @Action(NewsActions.LoadNewsComplete)
  completeLoadNews(
    { setState, getState }: StateContext<NewsState>,
    {payload}
  ) {
    setState({
      ...getState(),
      loading: false,
      news: payload?.result ?? [],
      totalNews: payload?.total ?? 10,
    });
  }

  @Action(NewsActions.UpdateFilters)
  UpdateFilters(
    { setState, getState, dispatch }: StateContext<NewsState>,
    {payload}
  ) {
    setState({
      ...getState(),
      filtersValue: {
        ...getState().filtersValue,
        ...payload,
      },
    });

    dispatch(new LoadNews());
  }

  @Action(NewsActions.LoadFiltersData)
  LoadFiltersData({ dispatch }: StateContext<NewsState>) {
    return this.newCategoriesApi
      .getNewCategories()
      .pipe(
        map((newCategories) =>
          dispatch(new LoadFiltersDataComplete({ newCategories }))
        )
      );
  }

  @Action(NewsActions.LoadFiltersDataComplete)
  LoadFiltersDataComplete(
    { setState, getState }: StateContext<NewsState>,
    {payload}
  ) {
    setState({
      ...getState(),
      filtersData: { ...getState().filtersData, ...payload },
    });
  }
}
