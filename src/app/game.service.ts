import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public score: BehaviorSubject<number> = new BehaviorSubject(0);
  public currentPinsUpCount: BehaviorSubject<number> = new BehaviorSubject(10);
  public board: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  public roll(int){

  }

  public newGame(){
    
  }
}
