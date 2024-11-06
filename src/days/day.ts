import { assertEquals } from "@std/assert";
import "../extensions/string-extensions.ts";
import "../extensions/array-extensions.ts";
import "../extensions/object-extensions.ts";
import { copy } from "https://deno.land/x/clipboard@v0.0.3/mod.ts";

export default abstract class Day {
  abstract dayPath(): string;
  abstract expectedPart1Results(): any[][];
  abstract expectedPart2Results(): any[][];
  abstract expectedPart3Results(): any[][];
  abstract part1(input: string): any;
  abstract part2(input: string): any;
  abstract part3(input: string): any;
  // Sometimes if things are not going well, want to easily shut off running the main parts. These do that.
  runPart1 = true;
  runPart2 = true;
  runPart3 = true;
  // Sometimes we need to change the input between parts.
  inputPart1 = "input.txt";
  inputPart2 = "input2.txt";
  inputPart3 = "input3.txt";

  run = () => {
    const executePart = (
      part: string,
      func: (input: string) => any,
      inputFile: string,
      expected?: any
    ) => {
      if (expected != null) {
        console.log(`${part} - ${inputFile} - ${expected}`);
      }
      const input = Deno.readTextFileSync(
        `${this.dayPath()}/data/${inputFile}`
      );
      const output = func(input);
      if (expected != null) {
        assertEquals(output, expected);
        console.log("\u001b[32mPASSED\u001b[0m");
      } else {
        console.log(`${part} - ${output}`);
        // Copy output to clipboard so it is easy to paste into submit
        copy(output);
      }
    };
    // Part1 Tests
    this.expectedPart1Results().forEach(([inputFile, expected]) =>
      executePart("Part1", this.part1, inputFile, expected)
    );
    // Part1
    this.runPart1 && executePart("Part1", this.part1, this.inputPart1);
    // Part2 Tests
    this.expectedPart2Results().forEach(([inputFile, expected]) =>
      executePart("Part2", this.part2, inputFile, expected)
    );
    // Part2
    this.runPart2 && executePart("Part2", this.part2, this.inputPart2);
    // Part3 Tests
    this.expectedPart3Results().forEach(([inputFile, expected]) =>
      executePart("Part3", this.part3, inputFile, expected)
    );
    // Part3
    this.runPart3 && executePart("Part3", this.part3, this.inputPart3);
  };
}
