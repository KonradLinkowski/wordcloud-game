import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, GameData } from 'src/app/services/data.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  templateUrl: './game.view.html',
  styleUrls: ['./game.view.scss'],
})
export class GameView {
  randomGameData: Observable<GameData>;
  constructor(
    private readonly dataService: DataService,
    private readonly scoreService: ScoresService,
    private readonly router: Router,
  ) {
    this.randomGameData = this.dataService.getGameData().pipe(
      map(data => data[Math.random() * data.length | 0])
    );
  }

  onFinish(score: number) {
    this.scoreService.saveScore(score);
    this.router.navigate(['/scores']);
  }
}
