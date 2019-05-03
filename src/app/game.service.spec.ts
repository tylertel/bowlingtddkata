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

  it("A strike increases the score ten plus previous 2 rolls.",() =>{
    service.roll(1);
    service.roll(5);
    service.roll(3);
    service.roll(10);

    expect(score).toBe(26);
  });

  it("A spare increases the score ten plus previous 1 roll.",() =>{
    service.roll(1);
    service.roll(5);
    service.roll(3);
    service.roll(10);

    expect(score).toBe(21);
  });
});
