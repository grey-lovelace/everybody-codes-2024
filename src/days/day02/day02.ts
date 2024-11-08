import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day02 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 4]];
  expectedPart2Results = () => [["sample2.txt", 37]];
  expectedPart3Results = () => [["sample3.txt", 10]];

  part1(input: string) {
    const [runicWords, notes] = input.paragraphs();
    return runicWords
      .replace("WORDS:", "")
      .split(",")
      .flatMap((word) => notes.matchAllAsList(RegExp(word, "g"))).length;
  }

  part2(input: string) {
    const [runicWords, notes] = input.paragraphs();
    return runicWords
      .replace("WORDS:", "")
      .split(",")
      .flatMap((word) => [word, word.reverse()])
      .unique()
      .flatMap((word) =>
        notes
          .matchAllAsList(RegExp(`(?=${word})`, "g"))
          .flatMap((match) =>
            range(match.index!, match.index! + word.length - 1)
          )
      )
      .unique().length;
  }

  part3(input: string) {
    const data = input.paragraphs();
    const notes = data[1].lines();
    const transposedNotes = notes
      .map((line) => line.letters())
      .transposed()
      .map((letters) => letters.join(""));
      
    const transposedIndexMap = notes
      .map((line, line_index) =>
        line.letters().map((_, index) => index + line.length * line_index)
      )
      .transposed()
      .flatten();

    return data[0]
      .replace("WORDS:", "")
      .split(",")
      .flatMap((word) => [word, word.reverse()])
      .unique()
      .flatMap((word) => [
        ...notes.flatMap((line, i) =>
          (line + line)
            .matchAllAsList(RegExp(`(?=${word})`, "g"))
            .flatMap((match) =>
              range(match.index!, match.index! + word.length - 1)
            )
            .map((index) => index % line.length)
            .map((index) => index + line.length * i)
        ),
        ...transposedNotes.flatMap((line, i) =>
          line
            .matchAllAsList(RegExp(`(?=${word})`, "g"))
            .flatMap((match) =>
              range(match.index!, match.index! + word.length - 1)
            )
            .map((index) => index + line.length * i)
            .map((index) => transposedIndexMap[index])
        ),
      ])
      .unique().length;
  }
}

if (import.meta.main) {
  new Day02().run();
}
