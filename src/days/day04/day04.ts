import Day from "../day.ts";

export default class Day04 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 10]];
  expectedPart2Results = () => [["sample2.txt", 10]];
  expectedPart3Results = () => [["sample3.txt", 8]];

  part1(input: string) {
    return input.lines()
      .map(Number)
      .sort((a, b) => a - b)
      .let(nails => 
        nails.map(nail => nail - nails[0])
      )
      .sum()
  }

  part2(input: string) {
    return input.lines()
      .map(Number)
      .sort((a, b) => a - b)
      .let(nails => 
        nails.map(nail => nail - nails[0])
      )
      .sum()
  }

  part3(input: string) {
    return input.lines()
      .map(Number)
      .let(nails => 
        nails.map(nail => 
          nails.map(nail2 => Math.abs(nail - nail2))
            .sum())
      )
      .sort((a, b) => a - b)
      [0]
  }
}

if (import.meta.main) {
  new Day04().run();
}
