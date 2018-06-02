import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {PostsComponent} from './posts/posts.component';
import {EditComponent} from './edit/edit.component';
import {AboutComponent} from './about/about.component';
import {appRoutes} from "./app.routes";
import {ApiService} from "./core/api.service";
import {AuthService} from "./core/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {SafePipe} from './shared/safe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostsComponent,
    EditComponent,
    AboutComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
