import Day from "../day.ts";

export default class Day01 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 5]];
  override inputPart2 = "input2.txt";
  expectedPart2Results = () => [["sample2.txt", 28]];
  override inputPart3 = "input3.txt";
  expectedPart3Results = () => [["sample3.txt", 30]];

  part1(input: string) {
    return input
      .split("")
      .map((monster) => potionsNeeded[monster])
      .sum();
  }

  part2(input: string) {
    return input
      .split("")
      .windowed(2)
      .map((window) => [
        ...window.map((monster) => potionsNeeded[monster]),
        window.includes("x") ? 0 : 2,
      ])
      .map((window) => window.sum())
      .sum();
  }

  part3(input: string) {
    return input
      .split("")
      .windowed(3)
      .map((window) => [
        ...window.map((monster) => potionsNeeded[monster]),
        xMap[window.count("x")],
      ])
      .map((window) => window.sum())
      .sum();
  }
}

const potionsNeeded: Record<string, number> = {
  A: 0,
  B: 1,
  C: 3,
  D: 5,
  x: 0,
};

const xMap: Record<number, number> = {
  0: 6,
  1: 2,
  2: 0,
  3: 0,
};

if (import.meta.main) {
  new Day01().run();
}
