import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from 'src/app/models/game';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  game!: Game;
  gameId!: string;
  gameOver = false;
  name: string = '';
  picture: string = '';

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      this.gameId = params.id;
      this.firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update:', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.cardPicked = game.cardPicked;
          this.game.currentCard = game.currentCard;
        })
    })

  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (this.game.players.length > 1 && !this.game.cardPicked) {
      this.game.cardPicked = true;
      this.game.currentCard = this.game.stack.pop();
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard!);
        this.game.cardPicked = false;
        this.saveGame();
      }, 1000);
    }
  }

// Edit one of the players
  editPlayer(playerID: number) {

    const dialogRef = this.dialog.open(EditPlayerComponent, {
      data: {name: this.name, picture: this.picture}
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data == 'DELETE') {
          this.game.players.splice(playerID, 1);
          this.game.player_images.splice(playerID, 1);
        } else {
          if (data.name){
            this.game.players[playerID] = data.name;
          }
          if (data.picture){
            this.game.player_images[playerID] = data.picture;
          }
        }
        this.saveGame();
      }
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      data: {name: this.name, picture: this.picture}
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data.name && data.picture) {
        this.game.players.push(data.name);
        this.game.player_images.push(data.picture);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON())
  }

}
