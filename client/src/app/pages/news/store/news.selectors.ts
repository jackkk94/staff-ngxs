import { Select } from "@ngxs/store";
import { Guid } from "guid-typescript";
import { NewCategory } from "../../new/models/new-category.model";
import { New } from "../../new/models/new.model";
import { NewsFiltersData, NewsSearchFilter } from "../models/news-search.model";

import { NewsState } from "./news.state";

type state = {appNewsState: NewsState};

export class NewsSelectors {
  @Select()
  public static news({appNewsState}: state): New[] {

    return appNewsState.news;
  }

  @Select()
  public static totalNews({appNewsState}: state): number {
    return appNewsState.totalNews;
  }

  @Select()
  public static filtersData({appNewsState}: state): NewsFiltersData {
    return appNewsState.filtersData;
  }

  @Select()
  public static filtersValue({appNewsState}: state): NewsSearchFilter {
    return appNewsState.filtersValue;
  }

  @Select()
  public static skipValue({appNewsState}: state): number {
   
    return appNewsState.filtersValue.skip;
  }

  @Select()
  public static filterByCategoriesData({appNewsState}: state): NewCategory[] {
    return appNewsState.filtersData.newCategories;
  }

  @Select()
  public static filterByTitleValue({appNewsState}: state): string {
    return appNewsState.filtersValue.fullName;
  }

  @Select()
  public static filterByCategoriesValue({appNewsState}: state): Guid[] {
    return appNewsState.filtersValue.newCategories;
  }
}