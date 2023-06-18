import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './modules/core/core.module';
import { HeaderModule } from './common/modules/header/header.module';
import { FooterModule } from './common/modules/footer/footer.module';
import { LoaderModule } from './common/modules/loader/loader.module';
import { AuthInterceptor } from './modules/core/services/auth.interceptor';
import { AuthGuardService } from './modules/core/services/auth-guard.service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppAuthState } from './common/store/auth/auth.state';

const LAYOUT_MODULES = [HeaderModule, FooterModule, LoaderModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([AppAuthState]),
    SharedModule,
    ...LAYOUT_MODULES,
  ],

  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
