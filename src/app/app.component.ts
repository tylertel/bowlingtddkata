import { Component, OnInit } from "@angular/core";
import { GameService } from "./game.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public score: number;
  public currentPinCount: number;
  public lastRoll: number;
  public allRolls: number[] = [];
  constructor(private _gameSvc: GameService) {}

  ngOnInit() {
    this._gameSvc.score$.subscribe(s => (this.score = s));
    this._gameSvc.currentPinsUpCount$.subscribe(p => (this.currentPinCount = p));
  }

  public roll() {
    this.lastRoll = Math.floor(Math.random() * this.currentPinCount);
    this.allRolls.push(this.lastRoll);
    this._gameSvc.roll(this.lastRoll);
  }

  public rollAll() {
    this.newGame();
    let i: number = 0;
    for (i; i <= 20; i++) {
      this.roll();
    }
  }

  public newGame() {
    this.allRolls = [];
    this._gameSvc.newGame();
  }
}
