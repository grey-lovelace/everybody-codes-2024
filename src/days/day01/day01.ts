import Day from "../day.ts";

export default class Day01 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 5]];
  expectedPart2Results = () => [["sample2.txt", 28]];
  expectedPart3Results = () => [["sample3.txt", 30]];

  part1(input: string) {
    return process(input, 1);
  }

  part2(input: string) {
    return process(input, 2);
  }

  part3(input: string) {
    return process(input, 3);
  }
}

const process = (input: string, groupSize: number) => {
  return input
    .split("")
    .windowed(groupSize)
    .map((window) => [
      ...window.map((monster) => potionsNeeded[monster]),
      groupBonus[groupSize - window.count("x")],
    ])
    .map((window) => window.sum())
    .sum();
};

const potionsNeeded: Record<string, number> = {
  x: 0,
  A: 0,
  B: 1,
  C: 3,
  D: 5,
};

const groupBonus: Record<number, number> = {
  0: 0,
  1: 0,
  2: 2,
  3: 6,
};

if (import.meta.main) {
  new Day01().run();
}
