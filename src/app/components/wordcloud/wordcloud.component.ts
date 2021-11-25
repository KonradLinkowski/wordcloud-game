import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { select } from 'd3';
import * as cloud from 'd3-cloud';

type SelectableWord = cloud.Word & { selected?: boolean };
type WordEvent = (e: MouseEvent, word: cloud.Word) => void;

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class Wordcloud implements AfterViewInit {
  @Input() words = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this'];
  @Input() fontSize = 50;
  @Input() width = 500;
  @Input() height = 500;
  @ViewChild('cloud') cloud!: ElementRef;

  private layout: any;

  constructor() {
    this.layout = cloud()
      .size([this.width, this.height])
      .words(this.words.map(word => ({ text: word, size: this.fontSize })))
      .padding(5)
      .rotate(() => 0)
      .fontSize(d => d.size!)
      .on('end', this.draw.bind(this));
  }

  ngAfterViewInit(): void {
    this.layout.start();
  }

  private draw(words: cloud.Word[]) {
    const [width, height] = this.layout.size();
    select(this.cloud.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .selectAll('text')
      .data(words)
      .enter()
      .append('text')
      .style('font-size', d => d.size + 'px' )
      .style('font-family', 'Roboto')
      .attr('text-anchor', 'middle')
      .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
      .text(b => b.text!)
      .style('cursor', 'pointer')
      .style('user-select', 'none')
      .on("click", this.onClick.bind(this) as WordEvent)
      .on("mouseover", this.onHover.bind(this) as WordEvent)
      .on("mouseout", this.onLeave.bind(this) as WordEvent);
  }

  private onClick(event: MouseEvent, word: SelectableWord) {
    word.selected = !word.selected;
    select(event.target as any)
      .attr('fill', word.selected ? 'red' : 'black');
  }

  private onHover(event: MouseEvent, word: SelectableWord) {
    select(event.target as any)
      .attr('fill', word.selected ? 'orange' : 'yellow');
  }

  private onLeave(event: MouseEvent, word: SelectableWord) {
    select(event.target as any)
      .attr('fill', word.selected ? 'red' : 'black');
  }
}
