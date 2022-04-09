import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() activePlayer: boolean = false;
  @Input() image: string = '1.webp';

  constructor() { }

  ngOnInit(): void {
  }

}
