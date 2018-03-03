import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'

import { AuthService } from './services/auth.service'

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ROUTES } from './routes/routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from "./guards/auth/auth.guard";
import {AuthedGuard} from "./guards/authed/authed.guard";
import { NotifyComponent } from './notify/notify.component';
import {NotifyService} from "./services/notify.service";
import { ProfileComponent } from './profile/profile.component';
import {UserService} from "./services/user.service";
import { PrettyDatePipe } from './pipes/pretty=date.pipe';
import {NgProgressModule} from "ng2-progressbar";


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DashboardComponent,
    LoginComponent,
    NotifyComponent,
    ProfileComponent,
    PrettyDatePipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpModule,
      NgProgressModule
  ],
  providers: [AuthService, AuthGuard, AuthedGuard, NotifyService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
