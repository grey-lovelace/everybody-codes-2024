import Day from "../day.ts";

export default class Day06 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", "RRB@"]];
  expectedPart2Results = () => [["sample2.txt", "RB@"]];
  expectedPart3Results = () => [["sample3.txt", "RB@"]];

  part1 = solve;
  part2 = (input: string) => solve(input, true);
  part3 = (input: string) => solve(input, true);
}

const solve = (input: string, firstLetterOnly = false) =>
  input
    .lines()
    .map((line) => line.split(":"))
    .map(([branch, conString]) => ({
      branch,
      connections: conString.split(","),
    }))
    .let((notes) =>
      notes
        .filter((note) => note.connections.includes("@"))
        .map((note) => {
          let currentNote = note;
          const path = ["@", currentNote.branch];
          while (currentNote.branch !== "RR") {
            currentNote = notes.find((maybeNextNote) =>
              maybeNextNote.connections.includes(currentNote.branch)
            )!;
            path.push(currentNote.branch);
          }
          return path.reverse().map((x) => (firstLetterOnly ? x[0] : x));
        })
    )
    .let(
      (paths) =>
        paths.find(
          (path) => paths.count((path2) => path.length === path2.length) === 1
        )!
    )
    .join("");

if (import.meta.main) {
  new Day06().run();
}
