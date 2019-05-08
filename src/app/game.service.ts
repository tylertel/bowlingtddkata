import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService {
  public score$: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentPinsUpCount$: BehaviorSubject<number> = new BehaviorSubject(10);
  public rolls$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  public frame$: Subject<number> = new Subject();
  constructor() {}

  public roll(pinCount) {
    let currentPinCount: number;
    this.currentPinsUpCount$.value - pinCount >= 1
      ? (currentPinCount = this.currentPinsUpCount$.value - pinCount)
      : (currentPinCount = 10);

    this.rolls$.next(this.rolls$.getValue().concat([pinCount]));
    this.currentPinsUpCount$.next(currentPinCount);
    this.calculateScore();
  }

  public newGame() {
    this.frame$.next(1);
    this.currentPinsUpCount$.next(10);
    this.rolls$.next([]);
    this.score$.next(0);
  }

  public calculateScore(){
    let score:number = 0;
    let rollCount:number = this.rolls$.value.length;
    for (let i = 0; i < rollCount ; i++) {
      if(this.rolls$.value[i] == 10){
        if(i + 2 >= rollCount){
          score = score + this.rolls$.value[i] + this.rolls$.value[i+1]+ this.rolls$.value[i+2] ;
        }
        else if(i + 1 >= rollCount){
          score = score + this.rolls$.value[i] + this.rolls$.value[i+1] ;
        }
        else{
          score = score + this.rolls$.value[i];
        }
      }
      else{
      score = score + this.rolls$.value[i];
      }
    }
    this.score$.next(score);
  }
}
