import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  templateUrl: './scores.view.html',
  styleUrls: ['./scores.view.scss'],
})
export class ScoresView {
  constructor(
    public readonly loginService: LoginService,
    public readonly scoresService: ScoresService,
  ) {}
}
