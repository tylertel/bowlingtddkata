import { TestBed } from "@angular/core/testing";

import { GameService } from "./game.service";

describe("GameService", () => {
  const service: GameService = new GameService();
  let pinsup: number;
  let score: number;
  service.currentPinsUpCount$.subscribe(p => (pinsup = p));
  service.score$.subscribe(s => (score = s));
  beforeEach(() => TestBed.configureTestingModule({}));

  it("Pins Left reduces after roll", () => {
    service.newGame();
    service.roll(1);
    service.currentPinsUpCount$.subscribe(p => (pinsup = p));
    expect(pinsup).toBe(9);
  });

  it("New Game starts with 10 pins up", () => {
    service.newGame();
    expect(pinsup).toBe(10);
  });

  it("Pins left is never less than 1", () => {
    service.roll(10);
    expect(pinsup).toBeGreaterThanOrEqual(1);
  });

  it("A roll increases the score.", () => {
    service.newGame();
    service.roll(5);
    expect(score).toBe(5);
  });

  it("A strike increases the score ten plus next 2 rolls.", () => {
    service.newGame();
    service.roll(2);
    service.roll(3);
    service.roll(10);
    service.roll(2);
    service.roll(2);
    service.roll(1);
    expect(score).toBe(24);
  });

  // it("A spare increases the score ten plus next 1 roll.",() =>{
  //   service.roll(5);
  //   service.roll(5);
  //   service.roll(3);
  //   service.roll(1);
  //   expect(score).toBe(14);
  // });

  it("Player rolls 20 times and knocks nothing, score remians 0.", () => {
    service.newGame();
    for (let i = 0; i < 20; i++) {
      service.roll(0);
    }
    expect(score).toEqual(0);
  });


});
