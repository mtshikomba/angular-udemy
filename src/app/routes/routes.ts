import { RegisterComponent } from "../register/register.component";
import { DashboardComponent} from "../dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { AuthGuard } from "../guards/auth/auth.guard";
import { AuthedGuard } from "../guards/authed/authed.guard"
import { ProfileComponent} from "../profile/profile.component"
import { WallComponent} from "../profile/wall/wall.component"
import { EditProfileComponent} from "../profile/edit-profile/edit-profile.component"
import { CreateJokeComponent } from "../create-joke/create-joke.component"

export const ROUTES = [
    { path: 'auth/register', component: RegisterComponent, canActivate: [AuthedGuard]},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'auth/login', component: LoginComponent, canActivate: [AuthedGuard]},
    { path: 'user/profile/:id', component: ProfileComponent, canActivate: [AuthGuard],
        children: [{ path: '', component: WallComponent },
                   { path: 'edit', component: EditProfileComponent}]},
    { path: 'joke/create', component: CreateJokeComponent, CanActivate: [AuthGuard]}

];
