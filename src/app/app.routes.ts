import {LoginComponent} from "./login/login.component";
import {PostsComponent} from "./posts/posts.component";
import {EditComponent} from "./edit/edit.component";
import {AboutComponent} from "./about/about.component";

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
    ]
  },
  {
    path: "about", component: AboutComponent
  },
];
