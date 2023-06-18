import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/common/models/auth.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Store } from '@ngxs/store';
import { AuthSelectors } from 'src/app/common/store/auth/auth.selectors';
import { Login, LoginComplete } from 'src/app/common/store/auth/auth.actions';

export const AUTH_KEY = 'staff:user';
@Injectable({
  providedIn: 'root',
})
export class AuthFacade {  
  public isAuthenticated$ = this.store.select(AuthSelectors.loggedIn)
  public token$ = this.store.select(AuthSelectors.UserToken);
  public userId$ = this.store.select(AuthSelectors.UserId)
  public currentUser$ = this.store.select(AuthSelectors.user)

  public token:string;

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.initData();
  }

  public login(form: LoginRequest): void{
    this.store.dispatch(new Login(form))
  }

  public initData(): void {
    const info = this.localStorageService.getData(AUTH_KEY);
    if (!info) {
      this.router.navigate(['/login']);
      return;
    }

    const userMeta = JSON.parse(
      this.localStorageService.getData(AUTH_KEY)
    );

    this.token = userMeta.token;

    this.store.dispatch(new LoginComplete(userMeta))
  }
}
