import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginView } from './views/login/login.view';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { LoginGuard } from './guard/login.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutGuard } from './guard/logout.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginView,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    LoginService,
    LoginGuard,
    LogoutGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
