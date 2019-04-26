import { Component, OnInit } from "@angular/core";
import { GameService } from "./game.service";
import { NumberSymbol } from "@angular/common";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  public score: number;
  public currentPinCount: number;
  public lastRoll: number;
  constructor(private _gameSvc: GameService) {}

  ngOnInit() {
    this._gameSvc.score.subscribe(s => (this.score = s));
    this._gameSvc.currentPinsUpCount.subscribe(p => (this.currentPinCount = p));
  }

  public roll() {
    this.lastRoll = Math.floor(Math.random() * this.currentPinCount);
    this._gameSvc.roll(this.lastRoll);
  }
}
