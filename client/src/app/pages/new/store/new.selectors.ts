import { NewDatasources } from '../components/new/new.component';
import { NewState } from './new.state';
import { Select } from '@ngxs/store';
import { New } from '../models/new.model';
import { NewCategory } from '../models/new-category.model';

type state = { appNewState: NewState };

export class NewSelectors {
  @Select()
  public static initialValue({ appNewState }: state): New {
    return appNewState.initialValue;
  }

  @Select()
  public static dataSources({ appNewState }: state): NewDatasources {
    return appNewState.dataSources;
  }

  @Select()
  public static categoryDataSources({ appNewState }: state): NewCategory[] {
    return appNewState.dataSources.categories;
  }
}
