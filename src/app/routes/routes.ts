import { RegisterComponent } from "../register/register.component";
import { DashboardComponent} from "../dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { AuthGuard } from "../guards/auth.guard"

export const ROUTES = [
    { path: 'auth/register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'auth/login', component: LoginComponent}
];
