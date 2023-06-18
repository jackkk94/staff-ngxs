import { Injectable } from '@angular/core';
import {
  CancelUpdate,
  CreateNew,
  LoadDataSources,
  LoadNew,
  UpdateNew,
} from './store/new.actions';
import { NewRequest } from './models/new.model';
import { Mode } from './components/new/new.component';
import { Store } from '@ngxs/store';
import { NewSelectors } from './store/new.selectors';

@Injectable()
export class NewFacade {
  public initialValue$ = this.store.select(NewSelectors.initialValue);
  public categoryDataSources$ = this.store.select(
    NewSelectors.categoryDataSources
  );
  public pageMode: Mode = 'view';

  constructor(private store: Store) {}

  public loadNew(id: string): void {
    this.store.dispatch(new LoadNew(id));
  }

  public updateNew(id: string, data: NewRequest): void {
    this.store.dispatch(new UpdateNew({ id, data }));
  }

  public createNew(data: NewRequest): void {
    this.store.dispatch(new CreateNew(data));
  }

  public loadDataSources(): void {
    this.store.dispatch(new LoadDataSources());
  }

  public setMode(mode: Mode): void {
    this.pageMode = mode;
  }

  public cancelUpdate(): void {
    this.store.dispatch(new CancelUpdate())
  }
}
