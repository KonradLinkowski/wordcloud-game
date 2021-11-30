import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService, GameData } from 'src/app/services/data.service';

@Component({
  selector: 'app-game.view',
  templateUrl: './game.view.html',
  styleUrls: ['./game.view.scss'],
})
export class GameView {
  randomGameData: Observable<GameData>;
  constructor(public readonly dataService: DataService) {
    this.randomGameData = this.dataService.getGameData().pipe(
      map(data => data[Math.random() * data.length | 0])
    );
  }
}
