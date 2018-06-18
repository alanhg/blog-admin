import {LoginComponent} from "./login/login.component";
import {PostsComponent} from "./posts/posts.component";
import {EditComponent} from "./edit/edit.component";
import {AboutComponent} from "./about/about.component";
import {AuthGuard} from "./auth.guard";

export const appRoutes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "login", component: LoginComponent
  }, {
    path: "posts",
    children: [
      {path: "", component: PostsComponent},
      {path: ":id", component: EditComponent}
    ],
    canActivate: [AuthGuard],
  },
  {
    path: "about", component: AboutComponent
  },
];
