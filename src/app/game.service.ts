import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public score$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentPinsUpCount$: BehaviorSubject<number> = new BehaviorSubject(10);
  public allRolls$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  public currentFrame$: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor() {}

  public roll(pinCount) {
    

    this.allRolls$.next(this.allRolls$.getValue().concat([pinCount]));
    //this.currentPinsUpCount$.next(currentPinCount);
    this.calculateScore();
  }

  public newGame() {
    this.currentFrame$.next(1);
    this.currentPinsUpCount$.next(10);
    this.allRolls$.next([]);
    this.score$.next(0);
  }

  public calculateScore() {
    let score: number = 0;
    let isFirstBall: boolean = true;
    let rollCount: number = this.allRolls$.value.length;
    let frame: number = 1;

    for (let i = 0; i < rollCount; i++) {
      if (this.allRolls$.value[i] == 10) {
        console.log('STRIKE');
        if (i + 2 < rollCount) {
          score =
            score +
            this.allRolls$.value[i] +
            this.allRolls$.value[i + 1] +
            this.allRolls$.value[i + 2];
        } else if (i + 1 < rollCount) {
          console.log('add next ball');
          score = score + this.allRolls$.value[i] + this.allRolls$.value[i + 1];
        } else {
          score = score + this.allRolls$.value[i];
        }
      } else {
        score = score + this.allRolls$.value[i];
      }

      let prevBall = this.allRolls$.value[i - 1];
      prevBall ? null : (prevBall = 0);

      if (
        isFirstBall == false ||
        (isFirstBall && this.allRolls$.value[i] + prevBall >= 10)
      ) {
        frame = frame + 1;
        this.currentPinsUpCount$.next(10);
        isFirstBall = true;
      } else {
        this.currentPinsUpCount$.next(this.currentPinsUpCount$.value - this.allRolls$.value[i]);
        isFirstBall = false;
      }
    }
    this.currentFrame$.next(frame);
    this.score$.next(score);
  }
}
