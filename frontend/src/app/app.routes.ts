import {PostsComponent} from './posts/posts.component';
import {EditComponent} from './edit/edit.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {ControlPanelComponent} from "./control-panel/control-panel.component";

export const appRoutes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'posts',
    children: [
      {path: '', component: PostsComponent},
      {path: ':id', component: EditComponent}
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'about', component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'control-panel',
    component: ControlPanelComponent,
    canActivate: [AuthGuard],
  },
];
