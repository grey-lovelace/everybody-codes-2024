import { Grid } from "../../utils/grid.ts";
import Day from "../day.ts";

export default class Day03 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 35]];
  expectedPart2Results = () => [["sample2.txt", 35]];
  expectedPart3Results = () => [["sample3.txt", 29]];

  part1 = solve
  part2 = solve
  part3 = (input: string) => solve(input, true)
}

const solve = (input: string, includeDiagonal = false) => {
  return input
    .replaceAll("#", "1")
    .replaceAll(".", "0")
    .lines()
    .map(l => l.letters().map(Number))
    .let(x => new Grid(x))
    .also(grid => {
      let digSpots = grid.points.filter(p => p.val === 1)
      while (digSpots.length > 0) {
        digSpots = digSpots.filter(p => !p.isOnEdge() && p.adjPoints(includeDiagonal).every(adj => adj.val === p.val))
        digSpots.forEach(point => point.val += 1)
      }
    })
    .points
    .map(p => p.val)
    .sum()
}

if (import.meta.main) {
  new Day03().run();
}
