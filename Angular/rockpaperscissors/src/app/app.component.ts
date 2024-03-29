import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userScore = 0;
  compScore = 0;
  userSelected: string = '';
  compSelected: string = '';
  action: string = "";
  status: string = "";
  compWeapons = [
    'rock',
    'paper',
    'scissors'
  ];

  userPick(userWeapon: string): void {
    this.userSelected = userWeapon;
    console.log(this.userSelected);
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 3);
      this.compSelected = this.compWeapons[randomNum];
      console.log(this.compSelected);
      this.checkResult();
    }, 1000);
  }

  clearField() {
    setTimeout( () => {
      this.status = '';
      this.userSelected = "";
      this.compSelected = "";
    }, 5000);
  }

  win(user: string, comp: string) {
    this.userScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'beats';
    this.status = ". You Win!";
    this.clearField();
  }

  lose(user: string, comp: string) {
    this.compScore ++;
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'loses to';
    this.status = ". You Lose!";
    this.clearField();
  }

  draw(user: string, comp: string) {
    this.userSelected = user;
    this.compSelected = comp;
    this.action = 'and';
    this.status = ". You Draw!";
    this.clearField();
  }

  checkResult() {
    const userChoice = this.userSelected;
    const compChoice = this.compSelected;
    switch (userChoice + compChoice) {
      case 'rockscissors' :
      case 'paperrock' :
      case 'scissorspaper':
        this.win(userChoice, compChoice);
        break;
      case 'rockpaper' :
      case 'scissorsrock' :
      case 'paperscissors' :
        this.lose(userChoice, compChoice);
        break;
      default:
        this.draw(userChoice, compChoice);
        break;
    }
  }
}
