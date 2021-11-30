import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { LogoutGuard } from './guard/logout.guard';
import { GameView } from './views/game/game.view';
import { LoginView } from './views/login/login.view';
import { ScoresView } from './views/scores/scores.view';

const routes: Routes = [{
  path: 'login',
  component: LoginView,
  canActivate: [LogoutGuard],
}, {
  path: '',
  component: GameView,
  canActivate: [LoginGuard],
}, {
  path: 'scores',
  component: ScoresView,
  canActivate: [LoginGuard],
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }