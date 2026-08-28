import StatsRow, { DiffsRow } from "../StatsRow/StatsRow.jsx";
import { isPracFromGameKey } from "../../utils/modes.js";

export default function AllStats() {
  return (
    <table>
      <tbody>
        <DiffsRow />
        <StatsRow
          title="total paths found"
          keyFilter={(key) => !isPracFromGameKey(key)}
          reduceFunc={(old, value) => old + value.found.length}
        />
        <StatsRow
          title="total days with +1 paths"
          keyFilter={(key) => !isPracFromGameKey(key)}
          reduceFunc={(old, value) => old + Math.min(value.found.length, 1)}
        />
      </tbody>
    </table>
  );
}
