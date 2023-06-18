
import { NewsFiltersData, NewsSearchFilter } from '../models/news-search.model';
import { SearchResponse } from 'src/app/common/models/search.model';
import { New } from '../../new/models/new.model';

export enum NewsActionTypes {
  LOAD_NEWS = '[NEWS] LOAD_NEWS',
  LOAD_NEWS_COMPLETE = '[NEWS] LOAD_NEWS_COMPLETE',
  LOAD_FILTERS_DATA = '[NEWS] LOAD_FILTERS_DATA',
  LOAD_FILTERS_DATA_COMPLETE = '[NEWS] LOAD_FILTERS_DATA_COMPLETE',
  LOAD_NEWS_ERROR = '[NEWS] LOAD_NEWS_ERROR',
  UPDATE_FILTERS = '[NEWS] UPDATE_FILTERS',
}

export class LoadNews {
  static readonly type = NewsActionTypes.LOAD_NEWS;
}

export class LoadNewsComplete {
  static readonly type = NewsActionTypes.LOAD_NEWS_COMPLETE;
  constructor(public payload: SearchResponse<New>) {}
}

export class LoadNewsError {
  static readonly type = NewsActionTypes.LOAD_NEWS_ERROR;
}

export class LoadFiltersData {
  static readonly type = NewsActionTypes.LOAD_FILTERS_DATA;
}

export class LoadFiltersDataComplete {
  static readonly type = NewsActionTypes.LOAD_FILTERS_DATA_COMPLETE;
  constructor(public payload: NewsFiltersData) {}
}

export class UpdateFilters {
  static readonly type = NewsActionTypes.UPDATE_FILTERS;
  constructor(public payload: Partial<NewsSearchFilter>) {}
}


export const NewsActions = {
   LoadNews,
   LoadFiltersData,
   LoadFiltersDataComplete,
   LoadNewsComplete,
   LoadNewsError,
   UpdateFilters,
}

