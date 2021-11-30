import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginView } from './views/login/login.view';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from './services/login.service';
import { LoginGuard } from './guards/login.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutGuard } from './guards/logout.guard';
import { WordcloudComponent } from './components/wordcloud/wordcloud.component';
import { GameView } from './views/game/game.view';
import { GameComponent } from './components/game/game.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ScoresService } from './services/scores.service';
import { ScoresView } from './views/scores/scores.view';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginView,
    GameView,
    GameComponent,
    WordcloudComponent,
    ScoresView,
    CapitalizePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Material
    MatButtonModule,
    MatInputModule,
  ],
  providers: [
    DataService,
    ScoresService,
    LoginService,
    LoginGuard,
    LogoutGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
