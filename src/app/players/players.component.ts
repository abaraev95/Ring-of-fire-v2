import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() activePlayer: boolean = false;
  @Input() image: string = '1.webp';

  constructor() { }

  ngOnInit(): void {
  }

}
