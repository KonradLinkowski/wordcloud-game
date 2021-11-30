import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { select } from 'd3';
import * as cloud from 'd3-cloud';

export interface Word {
  text: string;
  selected: boolean;
  tooltip?: string;
  tooltipColor?: string;
}

type SelectableWord = cloud.Word & Word;
type WordEvent = (e: MouseEvent, word: cloud.Word) => void;

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements AfterViewInit, OnChanges {
  @Input() words!: Word[];
  @Input() fontSize = 50;
  @Input() width = 500;
  @Input() height = 500;
  @Input() interactive = true;
  @Input() showTooltips = false;
  @Output() select = new EventEmitter<Word>();
  @ViewChild('cloud') cloud!: ElementRef;

  private compiledWords!: cloud.Word[];
  private layout: any;
  private firstDraw = true;

  constructor() {
    this.layout = cloud()
      .size([this.width, this.height])
      .padding(5)
      .rotate(() => 0)
      .fontSize(d => d.size!)
      .on('end', words => {
        this.compiledWords = words;
        this.draw();
      });
  }

  ngAfterViewInit(): void {
    this.layout.words(this.words.map(word => ({ size: this.fontSize, ...word })))
    this.layout.start();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.interactive && this.cloud) {
      this.draw();
    }
  }

  private draw() {
    const [width, height] = this.layout.size();

    if (!this.firstDraw) {
      select(this.cloud.nativeElement).select('svg').remove();
    }

    const groups = select(this.cloud.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('text')
      .data(this.compiledWords)
      .enter()
      .append('g')
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')')
    const texts = groups
      .append('text')
      .style('font-size', d => d.size! * 0.5 + 'px' )
      .style('font-family', 'Roboto')
      .attr('text-anchor', 'middle')
      .text(b => b.text!)
      .attr('fill', w => this.getWordData(w).selected ? 'red' : 'black')
      .style('user-select', 'none');
    if (this.showTooltips) {
      groups
        .append('text')
        .attr('id', d => 't' + d.x + '-' + d.y)
        .attr('x', d => 0)
        .attr('y', d => -d.size! * 0.6)
        .attr('text-anchor', 'middle')
        .attr('fill', w => this.getWordData(w).tooltipColor!)
        .text(w => this.getWordData(w).tooltip || '');
    }
    if (this.interactive) {
      texts
        .style('cursor', 'pointer')
        .on("click", this.onClick.bind(this) as WordEvent)
        .on("mouseover", this.onHover.bind(this) as WordEvent)
        .on("mouseout", this.onLeave.bind(this) as WordEvent);
    }

    this.firstDraw = false;
  }

  private onClick(event: MouseEvent, word: SelectableWord) {
    word.selected = !word.selected;
    select(event.target as any)
      .attr('fill', word.selected ? 'red' : 'black');
    this.select.emit({
      text: word.text!,
      selected: word.selected,
    });
  }

  private onHover(event: MouseEvent, word: SelectableWord) {
    select(event.target as any)
      .attr('fill', word.selected ? 'orange' : 'yellow');
  }

  private onLeave(event: MouseEvent, word: SelectableWord) {
    select(event.target as any)
      .attr('fill', word.selected ? 'red' : 'black');
  }

  private getWordData(word: cloud.Word): Word {
    return this.words.find(w => word.text === w.text)!;
  }
}
