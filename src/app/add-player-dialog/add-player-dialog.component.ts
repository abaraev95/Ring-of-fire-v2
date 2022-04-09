import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
  picture: string;
}

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

  name: string = '';
  allProfilePictures = ['1.webp', '2.png', 'pinguin.svg', 'monkey.png', 'winkboy.svg', 'serious-woman.svg'];
  highlight: string = '';
  

  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  highlightPicture(picture: string) {
    this.highlight = picture;
  }

}
