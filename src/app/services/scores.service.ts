import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SelectedWord {
  text: string;
  selected: boolean;
}

export interface Scores {
  last: number;
  highscore: number;
  total: number;
}

@Injectable()
export class ScoresService {
  private readonly LAST_SCORE_KEY = 'cloud-last_score';
  private readonly HIGHSCORE_SCORE_KEY = 'cloud-highscore_score';
  private readonly TOTAL_SCORE_KEY = 'cloud-total_score';
  scores = new BehaviorSubject<Scores>({
    last: 0,
    highscore: 0,
    total: 0,
  });

  constructor() {
    this.scores.next({
      last: +(localStorage.getItem(this.LAST_SCORE_KEY) ?? 0),
      highscore: +(localStorage.getItem(this.HIGHSCORE_SCORE_KEY) ?? 0),
      total: +(localStorage.getItem(this.TOTAL_SCORE_KEY) ?? 0),
    });
    this.scores.subscribe(({ last, highscore, total }) => {
      localStorage.setItem(this.LAST_SCORE_KEY, last.toString());
      localStorage.setItem(this.HIGHSCORE_SCORE_KEY, highscore.toString());
      localStorage.setItem(this.TOTAL_SCORE_KEY, total.toString());
    });
  }

  saveScore(score: number) {
    const { highscore, total } = this.scores.value;
    this.scores.next({
      last: score,
      highscore: score > highscore ? score : highscore,
      total: total + score
    });
  }
}
