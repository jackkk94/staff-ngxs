import {
  State,
  Action,
  StateContext,
  Store,
} from '@ngxs/store';

import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { New, NewRequest } from '../models/new.model';
import { NewDatasources } from '../components/new/new.component';
import {
  CreateNewComplete,
  LoadDataSourcesComplete,
  LoadNewComplete,
  LoadNewError,
  NewActions,
  UpdateNewComplete,
} from './new.actions';
import { NewCategoriesApi } from '../../news/api/new-categories.api.service';
import { NewsApi } from '../../news/api/news.api.service';

export interface NewState {
  initialValue: New;
  dataSources: NewDatasources;
}

const initialState = {
  initialValue: null,
  dataSources: null,
} as NewState;

@State<NewState>({
  name: 'appNewState',
  defaults: initialState,
})
@Injectable()
export class AppNewState {
  constructor(
    private newsApi: NewsApi,
    private newCategoriesApi: NewCategoriesApi,
    private store: Store,
    private router: Router
  ) {}
  @Action(NewActions.UpdateNewComplete)
  @Action(NewActions.LoadNewComplete)
  fn({ setState, getState }: StateContext<NewState>, { payload }) {
    setState({
      ...getState(),
      initialValue: payload,
    });
  }

  @Action(NewActions.LoadDataSourcesComplete)
  LoadDataSourcesComplete(
    { setState, getState }: StateContext<NewState>,
    { payload }
  ) {
    setState({
      ...getState(),
      dataSources: payload,
    });
  }

  @Action(NewActions.LoadNew)
  load({ dispatch }: StateContext<NewState>, { payload }) {
    return this.newsApi.getNewById(payload).pipe(
      map((result) => dispatch(new LoadNewComplete(result))),
      catchError(async () => {
        this.router.navigate(['company-news']);
        return dispatch(new LoadNewError());
      })
    );
  }

  @Action(NewActions.LoadDataSources)
  LoadDataSources({ dispatch }: StateContext<NewState>) {
    return this.newCategoriesApi
      .getNewCategories()
      .pipe(
        map((categories) =>
          dispatch(new LoadDataSourcesComplete({ categories }))
        )
      );
  }

  @Action(NewActions.CreateNew)
  createNew(
    { dispatch, setState, getState }: StateContext<NewState>,
    { payload }
  ) {
    setState({
      ...getState(),
      initialValue: payload,
    });
    return this.newsApi.createNew(payload).pipe(
      map((result) => {
        this.router.navigate(['/company-news', result.id]);
        return dispatch(new CreateNewComplete(result));
      })
    );
  }

  @Action(NewActions.CancelUpdate)
  CancelUpdate({ dispatch }: StateContext<NewState>, { payload }) {
    const initialValue = this.store.selectSnapshot(
      (store) => store.appNewState.initialValue
    );

    dispatch(new LoadNewComplete(initialValue));
  }

  @Action(NewActions.UpdateNew)
  UpdateNew(
    { dispatch, setState, getState }: StateContext<NewState>,
    { payload }
  ) {
    setState({
      ...getState(),
      initialValue: payload,
    });

    const { id, data } = payload as { id: string; data: NewRequest };
    return this.newsApi
      .updateNewById(id, data)
      .pipe(map((result) => dispatch(new UpdateNewComplete(result))));
  }
}
