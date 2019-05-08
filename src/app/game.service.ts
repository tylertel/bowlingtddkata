import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public score$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentPinsUpCount$: BehaviorSubject<number> = new BehaviorSubject(10);
  public rolls$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  public frame$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {}

  public roll(pinCount) {
    

    this.rolls$.next(this.rolls$.getValue().concat([pinCount]));
    //this.currentPinsUpCount$.next(currentPinCount);
    this.calculateScore();
  }

  public newGame() {
    this.frame$.next(1);
    this.currentPinsUpCount$.next(10);
    this.rolls$.next([]);
    this.score$.next(0);
  }

  public calculateScore() {
    let score: number = 0;
    let isFirstBall: boolean = true;
    let rollCount: number = this.rolls$.value.length;
    let frame: number = 1;

    for (let i = 0; i < rollCount; i++) {
      if (this.rolls$.value[i] == 10) {
        console.log('STRIKE');
        if (i + 2 < rollCount) {
          score =
            score +
            this.rolls$.value[i] +
            this.rolls$.value[i + 1] +
            this.rolls$.value[i + 2];
        } else if (i + 1 < rollCount) {
          console.log('add next ball');
          score = score + this.rolls$.value[i] + this.rolls$.value[i + 1];
        } else {
          score = score + this.rolls$.value[i];
        }
      } else {
        score = score + this.rolls$.value[i];
      }

      let prevBall = this.rolls$.value[i - 1];
      prevBall ? null : (prevBall = 0);

      if (
        isFirstBall == false ||
        (isFirstBall && this.rolls$.value[i] + prevBall >= 10)
      ) {
        frame = frame + 1;
        this.currentPinsUpCount$.next(10);
        isFirstBall = true;
      } else {
        this.currentPinsUpCount$.next(this.currentPinsUpCount$.value - this.rolls$.value[i]);
        isFirstBall = false;
      }
    }
    this.frame$.next(frame);
    this.score$.next(score);
  }
}
