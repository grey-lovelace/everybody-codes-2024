import { range } from "../../utils/range.ts";
import Day from "../day.ts";

export default class Day05 extends Day {
  dayPath = () => import.meta.dirname!;
  expectedPart1Results = () => [["sample.txt", 2323]];
  expectedPart2Results = () => [["sample2.txt", 50877075]];
  expectedPart3Results = () => [["sample3.txt", 6584]];

  part1(input: string) {
    const lines = input.lines()
      .map(l => l.split(" ").map(Number))
      .transposed()
    let currentLine = 0
    range(1,10).forEach(_ => {
      const item = lines[currentLine].shift()!
      const targetLineIndex = (currentLine + 1) % lines.length
      const targetLine = lines[targetLineIndex]

      let newIndex = Math.abs((item % (targetLine.length * 2)) - 1);
      if (newIndex > targetLine.length) {
          newIndex = (targetLine.length * 2) - newIndex;
      }
      targetLine.splice(newIndex, 0, item)
      currentLine = targetLineIndex
    })
    return Number(lines.map(line => line[0]).join(""))
  }

  part2(input: string) {
    const lines = input.lines()
      .map(l => l.split(" ").map(Number))
      .transposed()
    let currentLine = 0
    const numMap: Record<string, number> = {}
    for (let round = 1; round < Infinity; round++) {
      const item = lines[currentLine].shift()!
      const targetLineIndex = (currentLine + 1) % lines.length
      const targetLine = lines[targetLineIndex]

      let newIndex = Math.abs((item % (targetLine.length * 2)) - 1);
      if (newIndex > targetLine.length) {
          newIndex = (targetLine.length * 2) - newIndex;
      }
      targetLine.splice(newIndex, 0, item)
      const shout = lines.map(line => line[0]).join("")
      const occurrences = 1 + (numMap[shout] ?? 0)
      if (occurrences === 2024) return Number(shout) * round
      numMap[shout] = occurrences
      currentLine = targetLineIndex
    }
  }

  part3(input: string) {
    const lines = input.lines()
      .map(l => l.split(" ").map(Number))
      .transposed()
    let currentLine = 0
    const shouted: number[] = []
    const memory: string[] = []
    for (let round = 1; round < Infinity; round++) {
      const identifier = currentLine.toString() + JSON.stringify(lines)
      if (memory.includes(identifier)) break 
      memory.push(identifier)
      const item = lines[currentLine].shift()!
      const targetLineIndex = (currentLine + 1) % lines.length
      const targetLine = lines[targetLineIndex]

      let newIndex = Math.abs((item % (targetLine.length * 2)) - 1);
      if (newIndex > targetLine.length) {
          newIndex = (targetLine.length * 2) - newIndex;
      }
      targetLine.splice(newIndex, 0, item)
      const shout = lines.map(line => line[0]).join("")
      shouted.push(Number(shout))
      currentLine = targetLineIndex
    }
    return shouted.max()
  }
}

if (import.meta.main) {
  new Day05().run();
}