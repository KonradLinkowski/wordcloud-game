import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GameData } from 'src/app/services/data.service';
import { Word } from '../wordcloud/wordcloud.component';

export enum GameState {
  SELECTING,
  CHECKING,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnChanges {
  @Input() data!: GameData;
  words: Word[] = [];
  state = GameState.SELECTING;
  GameState = GameState;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.words = this.data.all_words.map(word => ({
        text: word,
        selected: false,
      }));
    }
  }

  onWordSelect(word: Word) {
    this.words.find(w => word.text === w.text)!.selected = word.selected;
  }

  onCheckAnswers() {
    this.state = GameState.CHECKING;
    this.words = this.words.map(word => {
      if (!word.selected) {
        return word;
      }
      const isCorrectAnswer = this.data.good_words.includes(word.text);
      return {
        ...word,
        tooltip: isCorrectAnswer ? 'Good' : 'Bad',
        tooltipColor: isCorrectAnswer ? 'green' : 'red',
      };
    })
  }

  onFinishGame() {

  }

  private calcScore() {
    
  }
}
