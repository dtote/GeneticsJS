import { CandidateSolution } from "../types/interfaces/CandidateSolution";

export function isLower(
  firstCandidate: CandidateSolution,
  secondCandidate: CandidateSolution
): boolean {
  return firstCandidate.output < secondCandidate.output;
}
