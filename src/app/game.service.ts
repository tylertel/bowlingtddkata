import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public score: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentPinsUpCount: BehaviorSubject<number> = new BehaviorSubject(10);
  public rolls: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor() {}

  public roll(pinCount) {
    let currentPinCount: number;
    this.currentPinsUpCount.value - pinCount >= 1
      ? (currentPinCount = this.currentPinsUpCount.value - pinCount)
      : (currentPinCount = 10);

    this.rolls.next(this.rolls.getValue().concat([pinCount]));

    this.currentPinsUpCount.next(currentPinCount);
  }

  public newGame() {
    this.currentPinsUpCount.next(10);
  }

  public calculateScore(){
    this.score.next(1);
  }
}
